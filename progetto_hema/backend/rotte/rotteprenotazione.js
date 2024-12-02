const express = require('express');
const { creaPrenotazione, recuperaPrenotazioni } = require('../controllori/controlloreprenotazione');

const router = express.Router();

router.post('/crea', creaPrenotazione);
router.get('/', recuperaPrenotazioni);

module.exports = router;
