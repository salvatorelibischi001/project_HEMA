exports.creaPrenotazione = (req, res) => {
    const { utenteId, tipoPrenotazione } = req.body;
  
    // Simulazione di prenotazione
    res.json({
      message: "Prenotazione creata con successo",
      data: { utenteId, tipoPrenotazione, data: new Date() },
    });
  };
  