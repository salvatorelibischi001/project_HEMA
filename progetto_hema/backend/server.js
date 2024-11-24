require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importa le rotte
const rotteAutenticazione = require("./rotte/rotteautenticazione");
const rottePrenotazioni = require("./rotte/rotteprenotazioni");

// Rotte
app.use("/api/auth", rotteAutenticazione);
app.use("/api/prenotazioni", rottePrenotazioni);

// Connessione al database
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connesso al database.");
    app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
  })
  .catch((error) => console.error("Errore di connessione al database:", error));

