const express = require('express');
const { register } = require('../controllori/controlloreautenticazione');

const router = express.Router();

// Rotta per registrazione
router.post('/register', register);

module.exports = router;
