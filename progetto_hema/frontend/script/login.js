document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita il reload della pagina

    // Raccogli i dati dal form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Effettua la richiesta al server
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }) // Passa i dati corretti
        });

        if (response.ok) {
            const data = await response.json();
            // Mostra un feedback di successo
            alert('Accesso riuscito!');
            // Reindirizza l'utente alla pagina principale
            window.location.href = 'dashboard.html';
        } else {
            const error = await response.json();
            // Mostra l'errore dal server
            alert(`Errore: ${error.message || 'Credenziali non valide.'}`);
        }
    } catch (err) {
        console.error('Errore durante il login:', err);
        alert('Errore durante il login. Controlla la connessione al server.');
    }
});