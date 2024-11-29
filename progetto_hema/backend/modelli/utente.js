const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  indirizzo: { type: String },
  gruppoSanguigno: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
