const mongoose = require('mongoose');

const utenteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gruppoSanguigno: { type: String, required: true },
});

const Utente = mongoose.model('Utente', utenteSchema);

module.exports = Utente;
