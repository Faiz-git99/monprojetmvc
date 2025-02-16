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
        let requeteSQL;
        let donnees;
    
        
        
        requeteSQL = "INSERT INTO utilisateur (id, nom, prenom, email, mot_de_passe, date_de_naissance) VALUES (?, ?, ?, ?, ?, ? )";
        donnees = [null, nom, prenom, email, mdp, naissance];
    
        req.getConnection((erreur, connection) => {
            if (erreur) {
                console.log("erreur");
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
    }
}