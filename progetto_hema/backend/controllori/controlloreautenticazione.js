const bcrypt = require('bcrypt');
const Utente = require('../modelli/utente');

// Funzione per la registrazione
const register = async (req, res) => {
    try {
        const { nome, email, password, gruppoSanguigno } = req.body;
        const userExists = await Utente.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email già registrata' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuovoUtente = new Utente({
            nome,
            email,
            password: hashedPassword,
            gruppoSanguigno,
        });

        await nuovoUtente.save();
        res.status(201).json({ message: 'Registrazione completata' });
    } catch (err) {
        console.error('Errore durante la registrazione:', err);
        res.status(500).json({ message: 'Errore del server' });
    }
};

// Funzione per il login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const utente = await Utente.findOne({ email });
        if (!utente) {
            console.log('Utente non trovato.');
        }

        const passwordCorretta = await bcrypt.compare(password, utente.password);
        if (!passwordCorretta) {
            return res.status(401).json({ message: 'Password errata' });
        }

        res.status(200).json({ message: 'Login riuscito', utente });
    } catch (err) {
        console.error('Errore durante il login:', err);
        res.status(500).json({ message: 'Errore del server' });
    }
};

module.exports = { register, login };
