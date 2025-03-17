const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/save', (req, res) => {
    const { username, password } = req.body;

    const data = `${username}:${password}\n`;

    fs.appendFileSync('users.txt', data);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
