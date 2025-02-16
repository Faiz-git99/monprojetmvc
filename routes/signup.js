// appeler le fichier express pour mieux créer les sites webs
const express = require('express');

// recupère la route qui mène au fichier signup
const signupController = require('../controllers/signup');



// créer le routeur avec express
const router = express.Router();

// remplace la syntaxe d'habitude <=> app.get("/", (req, res) => {
// res.render("signup")}); ce qui permet de rediriger le résultat vers signup
router.get('/signup', signupController.signupView);
router.post('/inscription', signupController.validationsignup);



module.exports = router; 