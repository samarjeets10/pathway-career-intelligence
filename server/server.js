require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.SERVER_PORT || 8000;

connectDB();

const server = app.listen(PORT, () => {
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