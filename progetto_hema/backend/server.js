const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./rotte/rotteautenticazione');
const prenotazioneRoutes = require('./rotte/rotteprenotazione');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connessione a MongoDB
mongoose
    .connect('mongodb://localhost:27017/hema', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connesso a MongoDB'))
    .catch((err) => console.error('Errore nella connessione a MongoDB:', err));

// Simula un database per utenti (da sostituire con il tuo modello Mongoose)
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    nome: String,
    cognome: String,
}));

// Endpoint per il login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            res.status(200).json({
                message: 'Login effettuato con successo',
                user: {
                    nome: user.nome,
                    cognome: user.cognome,
                    email: user.email,
                },
            });
        } else {
            res.status(400).json({ message: 'Credenziali non valide' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Errore del server', error });
    }
});

// Rotte esistenti
app.use('/api/auth', authRoutes);
app.use('/api/prenotazione', prenotazioneRoutes);

// Middleware 404
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint non trovato' });
});

// Avvio server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});