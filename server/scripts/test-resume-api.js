const fs = require("fs");
const path = require("path");

const BASE = "http://localhost:3000/api";
const [email, password, pdfPath] = process.argv.slice(2);

if (!email || !password || !pdfPath) {
    console.log("Usage: node scripts/test-resume-api.js <email> <password> <path-to-pdf>");
    process.exit(1);
}

let cookie = "";

async function call(method, url, { json, form } = {}) {
    const headers = { Cookie: cookie };
    let body;
    if (json) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(json);
    }
    if (form) body = form; // fetch sets the multipart boundary itself

    const res = await fetch(BASE + url, { method, headers, body });
    const text = await res.text();

    let data = null;
    try { data = JSON.parse(text); } catch { /* not JSON */ }
    if (!data) console.log(`  [non-JSON response] ${method} ${url} -> ${res.status}: ${text.slice(0, 200)}`);

    return { status: res.status, data };
}

function check(name, condition, extra = "") {
    console.log(`${condition ? "PASS" : "FAIL"}  ${name} ${extra}`);
}

function pdfForm(title, bytes = fs.readFileSync(pdfPath)) {
    const form = new FormData();
    if (title) form.append("title", title);
    form.append("resume", new Blob([bytes], { type: "application/pdf" }), path.basename(pdfPath));
    return form;
}

(async () => {
    const login = await fetch(BASE + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    cookie = login.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
    check("login", login.status === 200, `(${login.status})`);

    const before = (await call("GET", "/resumes")).data.data.length;

    const a = await call("POST", "/resumes", { form: pdfForm("Test Resume A") });
    check("upload A -> 201", a.status === 201, `(${a.status})`);
    check("upload response has no rawText", a.data?.data && !("rawText" in a.data.data.version));
    check("detectedSkills is a non-empty array", a.data?.data?.version?.detectedSkills?.length > 0,
        JSON.stringify(a.data?.data?.version?.detectedSkills));
    if (before === 0) check("first resume is default", a.data.data.resume.isDefault === true);

    const b = await call("POST", "/resumes", { form: pdfForm("Test Resume B") });
    check("upload B -> 201", b.status === 201, `(${b.status})`);
    const idA = a.data.data.resume._id;
    const idB = b.data.data.resume._id;

    const detail = await call("GET", `/resumes/${idA}`);
    check("detail includes rawText", typeof detail.data?.data?.latestVersion?.rawText === "string");

    await call("PATCH", `/resumes/${idB}`, { json: { isDefault: true } });
    const list = (await call("GET", "/resumes")).data.data;
    const defaults = list.filter((r) => r.isDefault);
    check("exactly one default, and it is B", defaults.length === 1 && defaults[0]._id === idB);

    check("bad id -> 400", (await call("GET", "/resumes/not-an-id")).status === 400);
    check("missing title -> 400", (await call("POST", "/resumes", { form: pdfForm(null) })).status === 400);
    check("non-PDF file -> 400",
        (await call("POST", "/resumes", { form: pdfForm("Fake", Buffer.from("just text")) })).status === 400);

    await call("DELETE", `/resumes/${idB}`);
    const afterB = (await call("GET", "/resumes")).data.data;
    check("deleting default promotes another", afterB.length === 0 || afterB.filter((r) => r.isDefault).length === 1);

    await call("DELETE", `/resumes/${idA}`);
    const after = (await call("GET", "/resumes")).data.data.length;
    check("cleanup restored original count", after === before, `(${after} vs ${before})`);
})();