const Utente = require('/modelli/Utente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrazione utente
exports.registrazione = async (req, res) => {
  const { nome, email, password, isDonatore, indirizzo } = req.body;

  try {
    const esistente = await Utente.findOne({ email });
    if (esistente) {
      return res.status(400).json({ msg: 'Utente già registrato' });
    }

    const nuovoUtente = new Utente({
      nome,
      email,
      password: await bcrypt.hash(password, 10),
      isDonatore,
      indirizzo,
    });

    await nuovoUtente.save();
    res.status(201).json({ msg: 'Registrazione completata con successo!' });
  } catch (error) {
    res.status(500).json({ msg: 'Errore nel salvataggio dell\'utente', error });
  }
};

// Login utente
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const utente = await Utente.findOne({ email });
    if (!utente) {
      return res.status(400).json({ msg: 'Utente non trovato' });
    }

    const match = await bcrypt.compare(password, utente.password);
    if (!match) {
      return res.status(400).json({ msg: 'Password errata' });
    }

    const token = jwt.sign({ id: utente._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Errore nel login', error });
  }
};
