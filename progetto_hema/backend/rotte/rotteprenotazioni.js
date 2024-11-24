const express = require("express");

const router = express.Router();

// Rotte esempio
router.get("/", (req, res) => {
  res.json({ message: "Endpoint per le prenotazioni." });
});

module.exports = router;
