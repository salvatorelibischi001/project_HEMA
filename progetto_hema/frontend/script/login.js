document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Email inviata:', email);
    console.log('Password inviata:', password); // Non mostrare mai in produzione

    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        console.log('Response:', response);
        console.log('Response Status:', response.status);

        if (response.ok) {
            const data = await response.json();
            alert('Accesso riuscito!');
            window.location.href = 'dashboard.html';
        } else {
            const error = await response.json();
            console.error('Errore dal server:', error);
            alert(`Errore: ${error.message || 'Credenziali non valide'}`);
        }
    } catch (err) {
        console.error('Errore durante il login:', err);
        alert('Errore durante il login. Controlla la connessione al server.');
    }
});
