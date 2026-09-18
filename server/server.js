require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/database');

connectDB();

const server = app.listen(3000, () => {
    console.log("server is running on port 3000");
});

server.on('error', (err) => {
    console.error(err.code === 'EADDRINUSE' ? 'Port 3000 already in use.' : err);
    process.exitCode = 1;
});

process.on('unhandledRejection', (reason) => console.error('Unhandled Rejection:', reason));
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exitCode = 1;
});