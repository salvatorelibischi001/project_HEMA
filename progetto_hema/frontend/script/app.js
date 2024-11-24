function vaiALogin() {
    window.location.href = "login.html";
  }
  
  function mostraPannelloUtente(nome, cognome, avatar) {
    const loginSection = document.getElementById("login-section");
    loginSection.innerHTML = `
      <div class="user-info">
        <img src="image/${avatar}" alt="Avatar">
        <span>${nome} ${cognome}</span>
        <button onclick="logout()">Logout</button>
      </div>
    `;
  }
  
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
  
  // Esempio di caricamento automatico del pannello utente
  document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1])); // Decodifica JWT
      mostraPannelloUtente(user.nome, user.cognome, user.avatar || "default-avatar.png");
    }
  });
  