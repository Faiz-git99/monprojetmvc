// appeler le fichier express pour mieux créer les sites webs
const express = require('express');

// recupère la route qui mène au fichier login
const formulaireProgrammeTvController = require('../controllers/formulaireProgrammeTv');

// créer le routeur avec express
const router = express.Router();

// remplace la syntaxe d'habitude <=> app.get("/", (req, res) => {
// res.render("login")}); ce qui permet de rediriger le résultat vers apropos
router.get('/formulaireProgrammeTv', formulaireProgrammeTvController.formulaireProgrammeTvView);

module.exports = router; 