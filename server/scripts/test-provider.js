require("dotenv").config();
const { generateJson } = require("../src/providers/groq.provider");

(async () => {
    const r = await generateJson({ system: "Return JSON.", prompt: 'Return {"ok": true}', maxTokens: 200, purpose: "smoke" });
    console.log(r);
})();