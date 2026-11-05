const apiError = require("../utils/apiError");

const validate = (schema, source = "body") => (req, res, next) => {
    const result = schema.safeParse(req[source] ?? {});

    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
        }));

        throw new apiError(400, "Validation failed.", errors);
    }

    if (source !== "query") req[source] = result.data;
    next();
};

module.exports = validate;