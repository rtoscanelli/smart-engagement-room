const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/';
            } else {
                const usernameInput = document.getElementById('username');
                const passwordInput = document.getElementById('password');
                usernameInput.value = '';
                passwordInput.value = '';
                usernameInput.classList.add('error');
                passwordInput.classList.add('error');
                usernameInput.focus();
            }
        })
        .catch(error => console.error(error));
});
