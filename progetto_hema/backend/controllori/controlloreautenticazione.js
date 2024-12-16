const bcrypt = require('bcrypt'); // Libreria per criptare le password
const Utente = require('../modelli/utente'); // Modello dell'utente per MongoDB

// Funzione per registrare un nuovo utente
const register = async (req, res) => {
    try {
        // Prendo i dati dalla richiesta
        const { nome, email, password, indirizzo, gruppoSanguigno } = req.body;

        // Controllo se l'email è già registrata
        const utenteEsistente = await Utente.findOne({ email });
        if (utenteEsistente) {
            return res.status(400).json({ message: 'Email già registrata' });
        }

        // Cripto la password
        const passwordCriptata = await bcrypt.hash(password, 10);

        // Creo il nuovo utente
        const nuovoUtente = new Utente({
            nome: nome, // Nome completo
            email: email, // Email
            password: passwordCriptata, // Password criptata
            indirizzo: indirizzo, //Indirizzo
            gruppoSanguigno: gruppoSanguigno, // Gruppo sanguigno
        });

        // Salvo l'utente nel database
        await nuovoUtente.save();

        // Rispondo con un messaggio di successo
        res.status(201).json({ message: 'Registrazione completata' });
    } catch (errore) {
        // Se qualcosa va storto, lo segnalo
        console.error('Errore durante la registrazione:', errore);
        res.status(500).json({ message: 'Errore del server' });
    }
};

// Funzione per il login
const login = async (req, res) => {
    try {
        // Prendo i dati dalla richiesta
        const { email, password } = req.body;

        // Cerco l'utente usando l'email
        const utente = await Utente.findOne({ email });
        if (!utente) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        // Controllo se la password è corretta
        const passwordCorretta = await bcrypt.compare(password, utente.password);
        if (!passwordCorretta) {
            return res.status(401).json({ message: 'Password errata' });
        }

        // Rispondo con un messaggio di successo e i dati dell'utente
        res.status(200).json({
            message: 'Login riuscito',
            utente: {
                nome: utente.nome, // Nome dell'utente
                email: utente.email, // Email dell'utente
                indirizzo: utente.indirizzo,
                gruppoSanguigno: utente.gruppoSanguigno, // Gruppo sanguigno dell'utente
            },
        });
    } catch (errore) {
        // Se qualcosa va storto, lo segnalo
        console.error('Errore durante il login:', errore);
        res.status(500).json({ message: 'Errore del server' });
    }
};

// Esporto le funzioni per poterle usare in altre parti del progetto
module.exports = { register, login };
