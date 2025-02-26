// création des chemins et des requêtes

const express = require("express");

const aproposRoutes = require('./routes/apropos');

const programmeTvRoutes = require('./routes/programmeTv');

const  loginRoutes = require('./routes/login');

const signupRoutes = require('./routes/signup');

const formulaireProgrammeTvRoutes = require('./routes/formulaireProgrammeTv');

const url = require("url");

const mysql2 = require("mysql2");

const myconnection = require("express-myconnection");


// connexion à la base de données
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


// utilisations des routeurs 
app.use('/', aproposRoutes); 
app.use('/', programmeTvRoutes);
app.use('/', loginRoutes);
app.use('/', signupRoutes);
app.use('/', formulaireProgrammeTvRoutes);

module.exports = app;