// j'importe le framewordk Expressjs.
const express = require('express');

// J'importe le pilote Mysql2 utilisé interroger la BDD Mysql
const mysql2 =require("mysql2");

// J'importe le pilote express-myconnection utilisé pour me connecter à la BDD
const myconnection = require('express-myconnection');
const connection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Je configure les éléments attendus pour me connecter à Mysql
const optionsConnexioBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Hakim02112006",
    database: "plateforme",
    port: 3306
};

// Middleware pour se connecter à la BDD Mysql pool est la stratégie de connexion à la BDD Mysql
app.use(myconnection(mysql2,optionsConnexioBaseDeDonnees,"pool"));

// Je précise que les vues sont dans le dossier views
app.set('views', './views');

// Je précise que nous utilisons le moteur EJS pour les vues
app.set('view engine', 'ejs');

// Je précise que j'utilise le dossier 'public' qui contient les fichiers statics
app.use(express.static('public'));


//  API Route pour la racine de la page : localhost:3004/
app.get('/', (req, res) => {
    // Message à afficher : Bienvenue chez May Gourmet
    res.write("<h1> Bienvenue chez May Gourmet </h1>");
    res.end();
});

// API route pour la page d'accueil
app.get("/api/clients", (req, res) => {
    console.log(" Je passe dans /api/clients");

    res.render('clients');

})

app.get("/api/location", (req, res) => {
    console.log(" Je passe dans /api/location");

    res.render('location');

})

app.get("/api/reservations", (req, res) => {
    console.log(" Je passe dans /api/resevations");

    res.render('reservations');

})


//fin du fichier. Donc ne pas coder en dessous de celui-ci
module.exports = app;