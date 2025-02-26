// Importation de bcrypt pour le hachage du mot de passe
const bcrypt = require('bcrypt');
const saltRounds = 10;

// exporte de fichier signup
module.exports = {
    signupView: (req, res) => {
        res.render('signup')
    },

    validationsignup : async (req, res) => {
            console.log("corps requête body", req.body);
            console.log("corps requête nom", req.body.identifiantnom);
            console.log("corps requête prénom", req.body.identifiantprenom);
            console.log("corps requête de l'email", req.body.identifiantmail);
            console.log("corps requête date de naissance", req.body.identifiantnaissance);
            console.log("corps requête mot de passe", req.body.mdp);
        
            
            let nom = req.body.identifiantnom;
            let prenom = req.body.identifiantprenom;
            let email = req.body.identifiantmail;
            let naissance = req.body.identifiantnaissance;
            let mdp = req.body.mdp;
            
            
        
            // utilisation de bcrypt pour hacher le mot de passe 
            try {
                const hashedPassword = await bcrypt.hash(mdp, saltRounds);

                let requeteSQL = "INSERT INTO utilisateur (id, nom, prenom, email, mot_de_passe, date_de_naissance) VALUES (?, ?, ?, ?, ?, ? )";
                let donnees = [null, nom, prenom, email, hashedPassword, naissance];
        
                req.getConnection((erreur, connection) => {
                    if (erreur) {
                        console.log("erreur", erreur);
                    } else {
                        connection.query(requeteSQL, donnees, (err, ajout) => {
                            if (err) {
                            console.log("erreur de de connexion", err);
                            } else {
                            console.log("mission réussi");
                            res.status(302).redirect("/signup");
                            }
                        });
                    }
                });
            } catch (err) {
            console.log("erreur lors du hachage de mot de passe", err);
            res.status(500).send("erreur interne du serveur")
             }
    }
        
            
};