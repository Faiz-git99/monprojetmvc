// réation des chemins et des requêtes

const express = require("express");

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
app.get("/apropos", (req, res) => {
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
});

// route qui affiche le programme tv
app.get("/programmeTv", (req, res) => {
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
});

app.get("/formulaireProgrammeTv", (req, res) => {
    
    res.render("formulaireProgrammeTv")
});

// crée une route avec post pour ajouter un élément dans la base de données
app.post("/modification", (req, res) => {
    console.log("corps requête body", req.body);
    console.log("corps requête chainetv", req.body.chainetv);
    console.log("corps requête num_chainetv", req.body.num_chainetv);
    console.log("corps requête descriptif", req.body.descriptif);

    let ID = req.body.id || null;  // If no id is provided, set it to null
    let chainetv = req.body.chainetv;
    let num_chainetv = req.body.num_chainetv;
    let descriptif = req.body.descriptif;
    let requeteSQL;
    let donnees;

    if (!ID) {
        // If no ID (new record), insert
        requeteSQL = "INSERT INTO programmediffusion (chainetv, num_chainetv, descriptif) VALUES (?, ?, ?)";
        donnees = [chainetv, num_chainetv, descriptif];
    } else {
        // If there is an ID (update existing record)
        requeteSQL = "UPDATE programmediffusion SET chainetv = ?, num_chainetv = ?, descriptif = ? WHERE id = ?";
        donnees = [chainetv, num_chainetv, descriptif, ID];
    }

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
            res.status(500).send("Database connection error");
        } else {
            connection.query(requeteSQL, donnees, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error executing SQL query");
                } else {
                    console.log("Modification réussi");
                    res.status(302).redirect("/programmeTv");  // Redirect after insertion or update
                }
            });
        }
    });
});


module.exports = app;