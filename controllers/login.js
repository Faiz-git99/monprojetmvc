// exporte de fichier login
module.exports = {
    loginView: (req, res) => {
        res.render('login')
    },

validationlogin: async (req, res) => {
    console.log("corps requête email", req.body.email);
    console.log("corps requête mot de passe", req.body.mdp);

    const email = req.body.email;
    const mdp = req.body.mdp;
    let requeteSQL = "SELECT * FROM utilisateur WHERE email = ?";
    
    
    if(!email || !mdp) {
        return res.send('login', {error : "Veuillez compléter tous les champs."});
    }
 
        req.getConnection((Erreur, connection) => {
            if(Erreur) {
                console.log("erreur");
                return res.send("Vous n'êtes pas arrivé à la base de donnée");
            } else {
                connection.query(requeteSQL, [email, mdp], (err, connexion) => {
                    if(err) {
                        console.log("erreur de connexion à votre compte", err)
                    } else {
                        console.log("Je me suis connécté à mon compte", connexion);

                        
                        res.status(302).redirect("/programmeTv");
                    }
                })
            }
        })
    }

}