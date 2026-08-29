const express = require('express');
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route"); // require all the routes here,

const app = express();

app.use(express.json());
app.use(cookieParser());

// using all the routes here :
app.use("/api/auth", authRouter);



module.exports = app;