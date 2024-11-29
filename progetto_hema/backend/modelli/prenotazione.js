const mongoose = require('mongoose');

// Definizione dello schema Prenotazione
const bookingSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // Nome del richiedente
  email: { type: String, required: true }, // Email
  tipo: { type: String, required: true }, // Tipo di prenotazione (es: donazione/richiesta)
  data: { type: Date, required: true }, // Data della prenotazione
  note: { type: String }, // Note opzionali
}, {
  timestamps: true, // Aggiunge createdAt e updatedAt automaticamente
});

// Esportazione del modello
module.exports = mongoose.model('Booking', bookingSchema);
