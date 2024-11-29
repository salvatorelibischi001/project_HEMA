// Importazione dei moduli necessari
const express = require("express"); // Framework per creare il server
const mongoose = require("mongoose"); // Libreria per interagire con MongoDB
const cors = require("cors"); // Per gestire le richieste cross-origin

// Configurazione dell'app Express
const app = express();
const PORT = process.env.PORT || 3000; // Porta del server (di default 3000)

// Middleware
app.use(cors()); // Permette richieste da origini diverse (frontend-backend)
app.use(express.json()); // Parsing del body delle richieste in JSON

// Connessione a MongoDB
const MONGO_URI = "mongodb://localhost:27017/hema"; // Stringa di connessione al database
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connesso al database MongoDB"))
  .catch((error) => console.error("Errore di connessione a MongoDB:", error));

// Importa le rotte
const authRoutes = require("./rotte/rotteautenticazione"); // Rotte per autenticazione
const bookingRoutes = require("./rotte/rotteprenotazioni"); // Rotte per prenotazioni

// Usa le rotte definite nei file separati
app.use("/api/auth", authRoutes); // Endpoint per autenticazione
app.use("/api/bookings", bookingRoutes); // Endpoint per prenotazioni

// Endpoint base per testare il server
app.get("/", (req, res) => {
  res.send("Benvenuto nel backend di HEMA!");
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server avviato e in ascolto sulla porta ${PORT}`);
});
