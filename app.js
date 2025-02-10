// réation des chemins et des requêtes

const express = require("express");

const aproposRoutes = require('./routes/apropos');

const programmeTvRoutes = require('./routes/programmeTv');

const  loginRoutes = require('./routes/login');

const signupRoutes = require('./routes/signup');

const formulaireProgrammeTvRoutes = require('./routes/formulaireProgrammeTv');

const url = require("url");

const mysql2 = require("mysql2");

const myconnection = require("express-myconnection");

const connection = {
    host : "localhost",
    user : "root",
    password : "ch14fz03",
    port : 3306,
    database : "projetmvc"
};

const app = express();

// l'endroit où se situe les vues qui s'affichent sur le naviagteur
app.set("views", "./views");

// préciser le moteur de la lecture de vues à savoir ejs
app.set("view engine", "ejs");

// créer un fichier static qui va permettre de ranger la mise en forme (css) et les images
app.use(express.static("public"));

// récupère la base de données
app.use(myconnection(mysql2, connection, "pool"));

// extraire des données dans formulaire
app.use(express.urlencoded({extends : false}));


// route par défaut
app.get("/", (req, res) => {
    res.end("BONJOUR")
});

// route qui affiche les membres de l'équipe
/*app.get("/apropos", (req, res) => {
    req.getConnection((erreur, connection) => {
        if(erreur){
            console.log(erreur)
        } else{
            connection.query("SELECT * FROM equipe", [], (err, resultat) => {
                if(err){
                    console.log(err)
                }else {
                    console.log("résulat", resultat);
                    res.render("apropos", {resultat});
                }
            });
        };
    });
}); */

// route qui affiche le programme tv
/*app.get("/programmeTv", (req, res) => {
    req.getConnection((erreur, connection) => {
        if(erreur){
            console.log(erreur)
        }else{
            connection.query("SELECT * FROM ProgrammeDiffusion" ,[], (err, resultat2) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("résultat2", resultat2)
                    res.render("programmeTv", {resultat2})
                }
            });
        };
    });
}); */

//création du formulaire de programme
/* app.get("/formulaireProgrammeTv", (req, res) => {
    res.render("formulaireProgrammeTv")
}); */

// crée une route avec post pour ajouter un élément dans la base de données
app.post("/modification", (req, res) => {
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
});

// Créer une route pour l'authentification/connexion
/* app.get("/login", (req, res) => {
    res.render("login")
}); */

// Créer une route avec post pour recupérer les éléments de la base de données
app.post("/login", (req, res) => {
    
})

/* app.get("/signup", (req, res) => {
    res.render("signup")
}); */

// créer une route post pour apporter la modification sur signup.ejs
app.post("signup", (req, res) => {

})

// utilisations des routeurs 
app.use('/', aproposRoutes); 
app.use('/', programmeTvRoutes);
app.use('/', loginRoutes);
app.use('/', signupRoutes);
app.use('/', formulaireProgrammeTvRoutes);

module.exports = app;