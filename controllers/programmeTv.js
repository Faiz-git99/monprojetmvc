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
        
    }
}