const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Utente = require("../modelli/utente");

const router = express.Router();

// Registrazione
router.post("/registrazione", async (req, res) => {
  const { nome, cognome, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuovoUtente = new Utente({ nome, cognome, email, password: hashedPassword });
    await nuovoUtente.save();
    res.status(201).json({ message: "Utente registrato con successo." });
  } catch (error) {
    res.status(500).json({ error: "Errore durante la registrazione." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const utente = await Utente.findOne({ email });
    if (!utente) return res.status(404).json({ error: "Utente non trovato." });

    const isPasswordValid = await bcrypt.compare(password, utente.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Password errata." });

    const token = jwt.sign({ id: utente._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, nome: utente.nome, cognome: utente.cognome, avatar: utente.avatar });
  } catch (error) {
    res.status(500).json({ error: "Errore durante il login." });
  }
});

module.exports = router;
