const mongoose = require('mongoose');

const prenotazioneSchema = new mongoose.Schema({
    utenteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utente', required: true },
    tipo: { type: String, enum: ['donazione', 'ricezione'], required: true },
    data: { type: Date, required: true },
    stato: { type: String, enum: ['pendente', 'completata'], default: 'pendente' },
});

const Prenotazione = mongoose.model('Prenotazione', prenotazioneSchema);

module.exports = Prenotazione;
