const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Registrace uživatele
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const users = loadUsers();
    if (users[username]) {
        return res.status(400).send('User already exists');
    }

    users[username] = password;
    saveUsers(users);

    res.sendStatus(200);
});

// Přihlášení uživatele
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = loadUsers();
    if (users[username] && users[username] === password) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

// Načtení uživatelů ze souboru
function loadUsers() {
    if (!fs.existsSync('users.txt') || fs.readFileSync('users.txt', 'utf-8').trim() === '') {
        return {};
    }
    const data = fs.readFileSync('users.txt', 'utf-8');
    return JSON.parse(data || '{}');
}

// Uložení uživatelů do souboru
function saveUsers(users) {
    fs.writeFileSync('users.txt', JSON.stringify(users));
}

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
