const express = require("express");
const { registrazione, login } = require("../controllori/controlloreautenticazione");
const router = express.Router();

router.post("/register", registrazione);
router.post("/login", login);

module.exports = router;
