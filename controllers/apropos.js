// exporte de fichier apropos 
module.exports = {
    aproposView: (req, res) => {
        req.getConnection((erreur, connection) => {
            if(erreur){
                console.log(erreur)
            } else{
                connection.query("SELECT * FROM equipe", [], (err, resultat) => {
                    if(err){
                        console.log(err)
                    }else {
                        console.log("résulat", resultat);
                        res.render("apropos", {resultat}); // affiche les éléments de la page apropos
                         
                    }
                });
            };
        });
        
    }
}

