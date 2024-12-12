document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita il reload della pagina

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }), // Passa i dati corretti
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('email', email); // Salva l'email in localStorage
            alert('Accesso riuscito!');
            window.location.href = 'dashboard.html'; // Reindirizza alla dashboard
        } else {
            const error = await response.json();
            alert(`Errore: ${error.message || 'Credenziali non valide'}`);
        }
    } catch (err) {
        console.error('Errore durante il login:', err);
        alert('Errore durante il login.');
    }
});
