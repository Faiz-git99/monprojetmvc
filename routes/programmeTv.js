// appeler le fichier express pour mieux créer les sites webs
const express = require('express');

// recupère la route qui mène au fichier apropos
const programmeTvController = require('../controllers/programmeTv');

// créer le routeur avec express
const router = express.Router();

// remplace la syntaxe d'habitude <=> app.get("/", (req, res) => {
// res.render("programmeTv")}); ce qui permet de rediriger le résultat vers programmeTv
router.get('/programmeTv', programmeTvController.programmeTvView);
router.post('/modification', programmeTvController.modificationProgramme);
module.exports = router; 