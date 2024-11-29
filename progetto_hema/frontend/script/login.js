document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita il reload della pagina

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Accesso riuscito!');
            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            alert(`Errore: ${error.message}`);
        }
    } catch (err) {
        console.error('Errore durante il login:', err);
        alert('Errore durante il login.');
    }
});