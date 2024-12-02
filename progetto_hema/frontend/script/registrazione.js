document.getElementById('form-registrazione').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const indirizzo = document.getElementById('indirizzo').value;
  const gruppoSanguigno = document.getElementById('gruppoSanguigno').value;

  try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, password, indirizzo, gruppoSanguigno })
      });

      if (response.ok) {
          alert('Registrazione riuscita!');
          window.location.href = 'login.html';
      } else {
          const error = await response.json();
          alert(`Errore: ${error.message}`);
      }
  } catch (err) {
      console.error('Errore durante la registrazione:', err);
      alert('Errore durante la registrazione.');
  }
});