const User = require('../modelli/utente');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { nome, email, password, indirizzo, gruppoSanguigno } = req.body;

    // Controllo utente esistente
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email già registrata' });

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creazione utente
    const user = new User({
      nome,
      email,
      password: hashedPassword,
      indirizzo,
      gruppoSanguigno
    });

    await user.save();
    res.status(201).json({ message: 'Utente registrato con successo!' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server', error });
  }
};
