//Le rotte sono il cuore della comunicazione client-server e permettono di inciare o richiedere i dati dal server:
//Il collegamento avviene mediante l'invio dei dati dal frontend da parte dei form, nello specifico dall'http designato.
const express = require('express');
const { register, login } = require('../controllori/controlloreautenticazione');

const router = express.Router();

// Rotta per la registrazione e il login, su utilizza app.post per l'invio di dati.
router.post('/register', register);//Rotta della regitsrazione;
router.post('/login', login);//Rotta di login;

module.exports = router;

/*
RICORDIAMO CHE:
-POST: Invio dati da parte del client al server;
-GET: Si fa richiesta di dati al server;
-Ambo i verbi appartengono al protocollo di comunicazione HTTP.
*/
