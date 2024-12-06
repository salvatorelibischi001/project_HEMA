async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            showDashboard(data.user);
        } else {
            alert('Login fallito. Controlla le credenziali.');
        }
    } catch (error) {
        console.error('Errore durante il login:', error);
    }
}

function showDashboard(user) {
    // Aggiorna la dashboard con i dati dell'utente
    document.getElementById('nomeUtente').textContent = `${user.nome} ${user.cognome}`;
    document.getElementById('userNome').textContent = user.nome;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userGruppoSanguigno').textContent = user.gruppoSanguigno || 'N/A';

    // Mostra o nasconde le sezioni della pagina
    document.querySelector('.user-actions').style.display = 'block';
    document.querySelector('.reservation-box').style.display = 'block';
    document.querySelector('.info-section').style.display = 'block';
}
