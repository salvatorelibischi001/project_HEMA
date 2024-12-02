const Prenotazione = require('../modelli/prenotazione');

// Creazione di una prenotazione
const creaPrenotazione = async (req, res) => {
    try {
        const { utenteId, tipo, data } = req.body;

        const nuovaPrenotazione = new Prenotazione({
            utenteId,
            tipo,
            data,
        });

        await nuovaPrenotazione.save();
        res.status(201).json({ message: 'Prenotazione creata con successo', nuovaPrenotazione });
    } catch (err) {
        console.error('Errore durante la creazione della prenotazione:', err);
        res.status(500).json({ message: 'Errore del server' });
    }
};

// Recupera prenotazioni
const recuperaPrenotazioni = async (req, res) => {
    try {
        const prenotazioni = await Prenotazione.find().populate('utenteId', 'nome email');
        res.status(200).json(prenotazioni);
    } catch (err) {
        console.error('Errore durante il recupero delle prenotazioni:', err);
        res.status(500).json({ message: 'Errore del server' });
    }
};

module.exports = { creaPrenotazione, recuperaPrenotazioni };
