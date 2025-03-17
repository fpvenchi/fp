document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;
      const encryptedPassword = btoa(password); // Jednoduché šifrování base64

      localStorage.setItem(username, encryptedPassword);
      alert('Registration successful!');
      window.location.href = 'login.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      const storedPassword = localStorage.getItem(username);

      if (storedPassword && atob(storedPassword) === password) {
        alert('Login successful!');
      } else {
        alert('Invalid credentials');
      }
    });
  }
});
