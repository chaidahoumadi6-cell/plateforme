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


//  API Route pour la racine de la page : localhost:3005/
app.get('/', (req, res) => {
    res.render('location');
});

// API route pour récupérer tous les clients
app.get("/api/clients", (req, res) => {
    console.log(" Je passe dans /api/clients");

    // Récupérer tous les clients de la base de données
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion base de données :", erreur);
            res.render('clients', { clients: [] });
        } else {
            const requeteSql = "SELECT * FROM clients";
            connection.query(requeteSql, (erreur, clients) => {
                if (erreur) {
                    console.log("Erreur récupération clients :", erreur);
                    res.render('clients', { clients: [] });
                } else {
                    console.log("Clients récupérés :", clients);
                    res.render('clients', { clients: clients });
                }
            });
        }
    });

})


app.delete('/api/clients/:id', (req, res) => {
    const idClient = req.params.id;
    const queryDelete = "DELETE FROM clients WHERE id = ?";

    req.getConnection((erreur, connection) => {
        if(erreur){
            console.log("Erreur suppression client : ", erreur);

        } else{
            connection.query(queryDelete, [idClient], (erreur, resultat) => {
                if(erreur) {
                    console.log("Erreur requête suppression : ", erreur);

                } else{
                    console.log("Bravo! Le client est supprimé");

                    // Redirect
                    res.status(200).json({ routeAccueil:"/api/clients"});
                }
            });
        }
    });
});


// J'ajoute un client dans la table clients pour cela j'utilise la méthode POST
app.post('/api/clients', (req, res) => {
    console.log("corps de la requête : ", req.body);

    console.log(req.body.nom);
    const nomClients = req.body.nom;

    console.log(req.body.prenom);
    const prenomClients= req.body.prenom;

    console.log(req.body.email);
    const emailClients = req.body.email;

    console.log(req.body.telephone);
    const telephoneClients = req.body.telephone;

    const requeteSql = "INSERT INTO clients (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)";

    const ordreChamps = [nomClients, prenomClients, emailClients, telephoneClients]; 

    // Je me connecte à la base de données
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur de connxion à la base de données : ", erreur);

        } else{ // Si j'ai réussi à me connecter à la base de données
            connection.query(requeteSql, ordreChamps, (erreur,nouveauClient) => {
                if(erreur) {
                    console.log("Erreur d'ajout client :", erreur);
                } else{
                    console.log("Bravo! Nouveau client ajouté");
                    res.status(302).redirect("/api/clients");
                }

            });
        }
    });
    

});


app.put('/api/clients/:id', (req, res) => {
    const idClient = req.params.id;
    const { nom, prenom, email, telephone} = req.body;

    const requeteSql = `UPDATE clients SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?`;
    const ordreChamps = [nom, prenom, email, telephone, idClient];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion base de données pour mise à jour :", erreur);
            return res.status(500).send("Erreur serveur");
        }

        connection.query(requeteSql, ordreChamps, (erreur, resultat) => {
            if (erreur) {
                console.log("Erreur de mise à jour du client :", erreur);
                return res.status(500).send("Erreur mise à jour");
            }

            if (resultat.affectedRows === 0) {
                return res.status(404).send("Client non trouvé");
            }

            console.log(`Client id=${idClient} modifié avec succès`);
            res.status(200).json({ message: "Client mis à jour" });
        });
    });
});




app.get("/api/location", (req, res) => {
    console.log(" Je passe dans /api/location");

    // Récupérer tous les logements de la base de données
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion base de données :", erreur);
            res.render('location', { logements: [] });
        } else {
            const requeteSql = "SELECT * FROM logements";
            connection.query(requeteSql, (erreur, logements) => {
                if (erreur) {
                    console.log("Erreur récupération logements :", erreur);
                    res.render('location', { logements: [] });
                } else {
                    console.log("Logements récupérés :", logements);
                    res.render('location', { logements: logements });
                }
            });
        }
    });

})

app.get("/api/reservations", (req, res) => {
    console.log(" Je passe dans /api/reservations");

    // Récupérer toutes les réservations de la base de données
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion base de données :", erreur);
            res.render('reservations', { reservations: [] });
        } else {
            const requeteSql = "SELECT * FROM reservations";
            connection.query(requeteSql, (erreur, reservations) => {
                if (erreur) {
                    console.log("Erreur récupération réservations :", erreur);
                    res.render('reservations', { reservations: [] });
                } else {
                    console.log("Réservations récupérées :", reservations);
                    res.render('reservations', { reservations: reservations });
                }
            });
        }
    });

})

// J'ajoute une réservation dans la table reservations pour cela j'utilise la méthode POST
app.post('/api/reservations', (req, res) => {
    console.log("corps de la requête : ", req.body);

    const { logement, dateDebut, dateFin, nom, email, telephone } = req.body;

    const requeteSql = "INSERT INTO reservations (logement, date_debut, date_fin, nom, email, telephone) VALUES (?, ?, ?, ?, ?, ?)";

    const ordreChamps = [logement, dateDebut, dateFin, nom, email, telephone]; 

    // Je me connecte à la base de données
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur de connexion à la base de données : ", erreur);

        } else{ // Si j'ai réussi à me connecter à la base de données
            connection.query(requeteSql, ordreChamps, (erreur, nouvelleReservation) => {
                if(erreur) {
                    console.log("Erreur d'ajout réservation :", erreur);
                } else{
                    console.log("Bravo! Nouvelle réservation ajoutée");
                    res.status(302).redirect("/api/reservations");
                }

            });
        }
    });
    

});

// Suppression d'une réservation avec la méthode DELETE
app.delete('/api/reservations/:id', (req, res) => {
    const idReservation = req.params.id;
    const queryDelete = "DELETE FROM reservations WHERE id = ?";

    req.getConnection((erreur, connection) => {
        if(erreur){
            console.log("Erreur suppression réservation : ", erreur);

        } else{
            connection.query(queryDelete, [idReservation], (erreur, resultat) => {
                if(erreur) {
                    console.log("Erreur requête suppression : ", erreur);

                } else{
                    console.log("Bravo! La réservation est supprimée");

                    // Redirect
                    res.status(200).json({ routeAccueil:"/api/reservations"});
                }
            });
        }
    });
});

// Modification d'une réservation avec la méthode PUT
app.put('/api/reservations/:id', (req, res) => {
    const idReservation = req.params.id;
    const { logement, dateDebut, dateFin, nom, email, telephone } = req.body;

    const requeteSql = `UPDATE reservations SET logement = ?, date_debut = ?, date_fin = ?, nom = ?, email = ?, telephone = ? WHERE id = ?`;
    const ordreChamps = [logement, dateDebut, dateFin, nom, email, telephone, idReservation];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log("Erreur de connexion base de données pour mise à jour :", erreur);
            return res.status(500).send("Erreur serveur");
        }

        connection.query(requeteSql, ordreChamps, (erreur, resultat) => {
            if (erreur) {
                console.log("Erreur de mise à jour de la réservation :", erreur);
                return res.status(500).send("Erreur mise à jour");
            }

            if (resultat.affectedRows === 0) {
                return res.status(404).send("Réservation non trouvée");
            }

            console.log(`Réservation id=${idReservation} modifiée avec succès`);
            res.status(200).json({ message: "Réservation mise à jour" });
        });
    });
});




//fin du fichier. Donc ne pas coder en dessous de celui-ci
module.exports = app;