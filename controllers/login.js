// Importation de bcrypt pour le hachage du mot de passe
const bcrypt = require('bcrypt');


// exporte de fichier login
module.exports = {
    loginView: (req, res) => {
        res.render('login')
    },

// exporte la fonction validationlogin de la route login par la méthode POST
    validationlogin: async (req, res) => {
        console.log("corps requête email", req.body.email);
        console.log("corps requête mot de passe", req.body.mdp);

        const email = req.body.email;
        const mdp = req.body.mdp;

        let requeteSQL = "SELECT * FROM utilisateur WHERE email = ?";

            req.getConnection((Erreur, connection) => {
                if(Erreur) {
                    console.log("erreur");
                    return res.send("Vous n'êtes pas arrivé à la base de donnée");
                } 

                    connection.query(requeteSQL, [email], async (err, results) => {
                        if(err) {
                            console.log("erreur de connexion à votre compte", err)
                            return res.send("erreur de connexion");
                        } 

                    // verifier si l'utilisateur existe
                        if (results.length === 0) {
                            console.log("Utilisateur non trouvé");
                            return res.send("Identifiant incorrect");
                        }
                    
                        const user = results[0];

                    // recupérer le mot de passe hache de la base de données
                        const hashedPassword = user.mot_de_passe;

                    
                    // comparer le mot de passe en clair avec le mot de passe haché
                        const verifyPassword = await bcrypt.compare(mdp, hashedPassword); 

                            if (verifyPassword) {
                                console.log("connexion réussie");
                                res.status(302).redirect("/programmeTv");
                            } else {
                                console.log("mot de passe incorrect");
                                res.status(302).send("le mot de passe saisi est incorrect");
                                }
                    
                    });
                
            
            });
    } 
    

};