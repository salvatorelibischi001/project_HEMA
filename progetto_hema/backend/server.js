//Il server è il cuore del backend, connette MongoDB usando mongoose. Inoltre, gestisce le varie rotte configura Express e Node.JS;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./rotte/rotteautenticazione');
const prenotazioneRoutes = require('./rotte/rotteprenotazione');
const Utente = require('./modelli/utente');

const app = express();

// Middleware: serve a tradurre i dati JSON leggibili per JavaScript.
app.use(express.json());
app.use(cors());

// Connessione a MongoDB: stabilisco la connessione mediante mongoose.
mongoose
    .connect('mongodb://localhost:27017/hema')
    console.log('Connesso a MongoDB')

// Middleware per le rotte.
app.use('/api/auth', authRoutes);
app.use('/api/prenotazione', prenotazioneRoutes);

// Rotta per ottenere informazioni utente
app.get('/api/user/info', async (req, res) => {
    try {
        const email = req.query.email; // Recupera l'email dalla query 

        //Ricerca informazioni utente tramite email di login.
        const utente = await Utente.findOne({ email });
        if (!utente) {
            return res.status(404).json({ message: 'Utente non trovato' });//Se l'email è diversa da quella inserita o non esistente.
        }

        res.status(200).json({
            nome: utente.nome,
            email: utente.email,
            gruppoSanguigno: utente.gruppoSanguigno,
        });
    } catch (err) {
        console.error('Errore durante il recupero delle informazioni utente:', err);
        res.status(500).json({ message: 'Errore del server' });
    }
});

// Rotta per ottenere lo storico delle prenotazioni. Da modificare per dare dinamicità.
app.get('/api/user/prenotazioni', async (req, res) => {
    try {
        const emailUtente = 'salvatore.libi@gmail.com'; // Temporaneamente impostato statico
        const prenotazioni = await Prenotazione.find({ emailUtente });

        if (!prenotazioni || prenotazioni.length === 0) {
            return res.status(200).json([]); // Nessuna prenotazione trovata
        }

        res.status(200).json(prenotazioni);
    } catch (err) {
        console.error('Errore durante il recupero delle prenotazioni:', err);
        res.status(500).json({ message: 'Errore del server durante il recupero delle prenotazioni.' });
    }
});

// Avvio del server, uso la porta 4000.
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server in ascolto!`);
});
