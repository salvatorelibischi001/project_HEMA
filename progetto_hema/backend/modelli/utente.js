const mongoose = require("mongoose");

const utenteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "default-avatar.png" }, // Percorso immagine profilo
});

module.exports = mongoose.model("Utente", utenteSchema);
