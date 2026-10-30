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


module.exports = app;