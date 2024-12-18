// Evento per il tasto logout
function logout(){
     localStorage.removeItem('email'); // Rimuove l'email salvata
     window.location.href = 'index.html'; // Reindirizza alla homepage
 };
 
 // Funzione per recuperare informazioni dell'utente
 document.addEventListener('DOMContentLoaded', async () => {
     const email = localStorage.getItem('email'); // Recupera l'email salvata
     if (!email) {
         alert('Devi effettuare il login!');
         window.location.href = 'login.html'; // Reindirizza al login se manca l'email
     }
 
     // Recupera le informazioni utente
     try {
         const response = await fetch(`http://localhost:4000/api/user/info?email=${email}`);
         if (!response.ok) {
             throw new Error('Errore nel recupero delle informazioni utente.');
         }
 
         const userInfo = await response.json();
 
         // Aggiorna le informazioni nella dashboard nomeAvatar e nome per evitare ambiguità tra le variabili.
         document.getElementById('nomeAvatar').textContent = userInfo.nome;
         document.getElementById('nome').textContent = userInfo.nome;
         document.getElementById('email').textContent = userInfo.email;
         document.getElementById('indirizzo').textContent = userInfo.indirizzo;
         document.getElementById('gruppoSanguigno').textContent = userInfo.gruppoSanguigno;
 
     } catch (err) {
         console.error('Errore nel caricamento delle informazioni utente:', err);
         document.getElementById('nome').textContent = 'Errore nel caricamento';
         document.getElementById('email').textContent = 'Errore nel caricamento';
         document.getElementById('indirizzo').textContent = 'Errore nel caricamento';
         document.getElementById('gruppoSanguigno').textContent = 'Errore nel caricamento';
     }
 });
 