const express = require('express');
const { register, login } = require('../controllori/controlloreautenticazione');

const router = express.Router();

// Rotta per la registrazione
router.post('/register', register);
router.post('/login', login);

module.exports = router;
