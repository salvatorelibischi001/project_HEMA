//Il server è il cuore del backend, connette MongoDB usando mongoose. Inoltre, gestisce le varie rotte configura Express e Node.JS;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./rotte/rotteautenticazione');
const prenotazioneRoutes = require('./rotte/rotteprenotazione');
const rotteautenticazione = require('./rotte/rotteautenticazione');

const app = express();

// Middleware: serve a tradurre i dati JSON leggibili per JavaScript.
app.use(express.json());
app.use(cors());

// Connessione a MongoDB: stabilisco la connesione mediante mongooose.
mongoose
    .connect('mongodb://localhost:27017/hema', { useNewUrlParser: true, useUnifiedTopology: true })

// Middleware per le rotte.
app.use('/api/auth', authRoutes);
app.use('/api/prenotazione', prenotazioneRoutes);//Si occupa della comunicazione di prenotazioni.
app.use('/api/auth', rotteautenticazione);//Si occupa del login e registrazione utente.

// Avvio del server, uso la porta 4000.
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});