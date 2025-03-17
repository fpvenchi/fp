async function handleRegister() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const hashedPassword = await hashPassword(password);

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: hashedPassword })
    }).then(response => {
        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'index.html';
        } else {
            alert('User already exists!');
        }
    });
}

async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const hashedPassword = await hashPassword(password);

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: hashedPassword })
    }).then(response => {
        if (response.ok) {
            alert('Login successful!');
        } else {
            alert('Invalid username or password');
        }
    });
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(byte => byte.toString(16).padStart(2, '0')).join('');
}
