const User = require("../modelli/utente");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Funzione di registrazione
exports.registrazione = async (req, res) => {
  const { nome, email, password, indirizzo, gruppoSanguigno } = req.body;

  try {
    // Verifica se l'email esiste già
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email già registrata" });

    // Crea hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Salva un nuovo utente
    const newUser = new User({ nome, email, password: hashedPassword, indirizzo, gruppoSanguigno });
    await newUser.save();

    res.status(201).json({ message: "Registrazione completata" });
  } catch (error) {
    res.status(500).json({ message: "Errore del server", error });
  }
};

// Funzione di login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Credenziali errate" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Credenziali errate" });

    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Errore del server", error });
  }
};
