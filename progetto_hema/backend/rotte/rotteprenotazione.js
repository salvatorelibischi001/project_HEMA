const express = require('express');
const { createBooking, getBookings } = require('../controllori/controlloreprenotazione');

// Creazione del router
const router = express.Router();

// Rotta per creare una nuova prenotazione
router.post('/create', createBooking);

// Rotta per ottenere tutte le prenotazioni
router.get('/all', getBookings);

// Esportazione del router
module.exports = router;

