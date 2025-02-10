// appeler le fichier express pour mieux créer les sites webs
const express = require('express');

// recupère la route qui mène au fichier apropos
const aproposController = require('../controllers/apropos');

// créer le routeur avec express
const router = express.Router();

// remplace la syntaxe d'habitude <=> app.get("/", (req, res) => {
// res.render("apropos")}); ce qui permet de rediriger le résultat vers apropos
router.get('/apropos', aproposController.aproposView);

module.exports = router; 