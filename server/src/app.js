const express = require('express');
const authRouter = require("./routes/auth.route"); // require all the routes here :

const app = express();

app.use(express.json());

// using all the routes here :
app.use("/api/auth", authRouter);



module.exports = app;