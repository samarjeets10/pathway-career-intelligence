const express = require('express');
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route"); // require all the routes here,
const interviewRouter = require('./routes/interview.routes')
const cors = require('cors');

const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

app.use(express.json({
    limit: "16kb"
}));

app.use(cookieParser());

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true
}));

// using all the routes here :
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);


app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message;

    if (err.code === 11000) {
        statusCode = 409;
        message = `${Object.keys(err.keyPattern || {})[0] || "Field"} already exists.`;
    }

    if (err.code === "LIMIT_FILE_SIZE") {
        statusCode = 413;
        message: "Resume file must me under 3MB.";
    }

    if (statusCode === 500 && process.env.NODE_ENV === "production") {
        message = "Internal server error";
    }

    res.status(statusCode).json({ success: false, message, errors: err.errors || [] });
});


module.exports = app;