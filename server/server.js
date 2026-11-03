require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.SERVER_PORT || 8000;

async function startServer() {
    try {

        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`Server is running on Port : ${PORT}`)
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

    } catch (error) {
        console.error("Application startup faild: ", error);
        process.exit(1);
    }
}

startServer();