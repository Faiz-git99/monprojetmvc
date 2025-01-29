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


module.exports = app;