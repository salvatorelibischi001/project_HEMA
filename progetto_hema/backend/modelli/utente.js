//I modelli definiscono la struttura dei dati che veranno salvati del database di MongoDB;
//Vale lo stesso per prenotazione.
const mongoose = require('mongoose');

const utenteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    indirizzo: { type: String, required: true },
    gruppoSanguigno: { type: String, required: true },
});

const Utente = mongoose.model('Utente', utenteSchema);

module.exports = Utente;
