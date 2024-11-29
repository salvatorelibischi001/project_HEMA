const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./rotte/rotteprenotazione');

const app = express();

// Middleware per il parsing dei dati JSON
app.use(express.json());

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/hema', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connessione a MongoDB riuscita!'))
  .catch(err => console.error('Errore nella connessione a MongoDB:', err));

// Rotte
app.use('/api/bookings', bookingRoutes);

// Avvio del server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
