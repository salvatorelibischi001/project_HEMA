// Funzione di login (simulato per esempio)
function login(username) {
    // Simula una sessione di login (in un'applicazione reale, qui dovresti fare una chiamata API)
    localStorage.setItem('user', username);  // Salviamo il nome utente nel localStorage
    window.location.href = "index.html";  // Redirige alla home dopo il login
}

// Funzione di logout
function logout() {
    // Rimuove il nome utente dal localStorage
    localStorage.removeItem('user');
    window.location.href = "index.html";  // Torna alla home dopo il logout
}

// Funzione per aggiornare la UI in base allo stato di login
function updateUI() {
    const userInfo = document.getElementById('user-info');
    const loginPanel = document.getElementById('login-panel');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');

    const username = localStorage.getItem('user');

    if (username) {
        // Mostra il pannello dell'utente loggato
        userInfo.style.display = 'block';
        loginPanel.style.display = 'none';
        userName.textContent = username;
        userAvatar.src = 'img/avatar.png'; // Puoi modificare questo percorso se carichi una foto avatar personalizzata
    } else {
        // Nascondi il pannello dell'utente loggato
        userInfo.style.display = 'none';
        loginPanel.style.display = 'block';
    }
}

// Gestione del login tramite form
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();  // Impedisce il submit normale

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulazione di un controllo credenziali (ad esempio username: 'admin', password: 'password123')
    if (username === 'admin' && password === 'password123') {
        login(username);
    } else {
        alert('Credenziali errate, riprova.');
    }
});

// Carica la UI all'apertura della pagina
document.addEventListener('DOMContentLoaded', function() {
    updateUI();  // Aggiorna la UI in base alla presenza dell'utente nel localStorage
});
