const pdfParse = require('pdf-parse');
const apiError = require('./apiError');

async function extractPdfText(buffer) {
    if (buffer.subarray(0, 4).toString() !== "%PDF") {
        throw new apiError(400, "Only valid PDF files are allowed.");
    }

    const parser = new pdfParse.PDFParse(Uint8Array.from(buffer));

    try {
        const result = await parser.getText();
        return { text: result.text || "", pageCount: result.total ?? null };
    } catch {
        throw new apiError(422, "Could not read this PDF. It may be corrupted or password-protected.");
    } finally {
        await parser.destroy?.();
    }
}


module.exports = { extractPdfText }