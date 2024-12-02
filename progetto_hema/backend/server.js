const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./rotte/rotteautenticazione');
const prenotazioneRoutes = require('./rotte/rotteprenotazione');
const rotteautenticazione = require('./rotte/rotteautenticazione');


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connessione a MongoDB
mongoose
    .connect('mongodb://localhost:27017/hema', { useNewUrlParser: true, useUnifiedTopology: true })

// Rotte
app.use('/api/auth', authRoutes);
app.use('/api/prenotazione', prenotazioneRoutes);
app.use('/api/auth', rotteautenticazione);

// Avvio del server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
