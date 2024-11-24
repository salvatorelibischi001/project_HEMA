const express = require('express');
const router = express.Router();
const controlloreAutenticazione = require('/controllori/controlloreAutenticazione');

// Rotte
router.post('/registrazione', controlloreAutenticazione.registrazione);
router.post('/login', controlloreAutenticazione.login);

module.exports = router;
