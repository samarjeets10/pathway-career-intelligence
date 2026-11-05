function normalizeText(text = "") {
    return String(text)
        .replace(/\r/g, "")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

module.exports = { normalizeText };