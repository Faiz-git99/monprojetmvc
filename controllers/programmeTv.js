// exporte de fichier ProgrammeTv
module.exports = {
    programmeTvView: (req, res) => {
        req.getConnection((erreur, connection) => {
            if(erreur){
                console.log(erreur)
            }else{
                connection.query("SELECT * FROM ProgrammeDiffusion" ,[], (err, resultat2) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("résultat2", resultat2)
                        res.render("programmeTv", {resultat2}) // affiche les éléments de la page programmeTv
                    }
                });
            };
        });
        
    },

    modificationProgramme : async (req, res) => {
    console.log("corps requête body", req.body);
    console.log("corps requête chainetv", req.body.chainetv);
    console.log("corps requête num_chainetv", req.body.num_chainetv);
    console.log("corps requête descriptif", req.body.descriptif);

    let ID = req.body.id || null;  
    let chainetv = req.body.chainetv;
    let num_chainetv = req.body.num_chainetv;
    let descriptif = req.body.descriptif;
    let requeteSQL;
    let donnees;

    if (!ID) {
        // Si ID n'existe pas, on fera INSERT INTO () VALUES () pour ajouter une valeur
        requeteSQL = "INSERT INTO programmediffusion (chainetv, num_chainetv, descriptif) VALUES (?, ?, ?)";
        donnees = [chainetv, num_chainetv, descriptif];
    } else {
        // Si ID existe déjà, on fera UPDATE table SET colonne = ? WHERE id = ? pour modifier la valeur
        requeteSQL = "UPDATE programmediffusion SET chainetv = ?, num_chainetv = ?, descriptif = ? WHERE id = ?";
        donnees = [chainetv, num_chainetv, descriptif, ID];
    }

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query(requeteSQL, donnees, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Modification réussi");
                    res.status(302).redirect("/programmeTv");  // Redirige après l'ajout ou la modification
                }
            });
        }
    });
    }
};