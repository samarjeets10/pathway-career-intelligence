require('dotenv').config();

const app = require('./src/app');

app.listen(3000, (req, res) => {
    res.status
    (200).json({
        message: "server is running on port 3000"
    })
})