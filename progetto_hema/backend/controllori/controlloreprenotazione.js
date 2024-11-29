const Booking = require('../modelli/prenotazione'); // Importa il modello Prenotazione

// Funzione per creare una prenotazione
exports.createBooking = async (req, res) => {
  try {
    const { nome, email, tipo, data, note } = req.body;

    // Validazione dei dati (opzionale, puoi estenderla)
    if (!nome || !email || !tipo || !data) {
      return res.status(400).json({ message: 'Tutti i campi obbligatori devono essere compilati.' });
    }

    // Creazione di una nuova prenotazione
    const newBooking = new Booking({
      nome,
      email,
      tipo,
      data,
      note,
    });

    await newBooking.save(); // Salva la prenotazione nel database
    res.status(201).json({ message: 'Prenotazione creata con successo!', booking: newBooking });
  } catch (error) {
    console.error('Errore nella creazione della prenotazione:', error);
    res.status(500).json({ message: 'Errore nella creazione della prenotazione.', error });
  }
};

// Funzione per ottenere tutte le prenotazioni
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find(); // Recupera tutte le prenotazioni dal database
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Errore nel recupero delle prenotazioni:', error);
    res.status(500).json({ message: 'Errore nel recupero delle prenotazioni.', error });
  }
};
