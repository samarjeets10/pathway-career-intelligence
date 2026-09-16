const express = require('express');
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route"); // require all the routes here,
const interviewRouter = require('./routes/interview.routes')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// using all the routes here :
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter)


module.exports = app;