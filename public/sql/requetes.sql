-- créer une base de données
CREATE DATABASE plateforme;

-- Créer une table de client
CREATE TABLE clients(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(100) NOT NULL
);


-- Afficher les tables existante
SHOW TABLES;

INSERT INTO clients (nom, prenom, email, telephone) VALUES ("SAID","Fatima","hshahida@gamil.com","0639 02 11 20");

-- Lister tous les CLIENT enregistrés dans la table clients
SELECT * FROM clients; 

-- Créer la table logement
CREATE TABLE logements(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(150) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL
);

INSERT INTO logements (nom, prix) VALUES ("Appartement Centre-ville", 55.00);
INSERT INTO logements (nom, prix) VALUES ("Maison familiale", 80.00);
INSERT INTO logements (nom, prix) VALUES ("Studio étudiant", 40.00);

-- Lister les logements enregistrés dans la table logements
SELECT * FROM logements;


-- Créer la table reservation
CREATE TABLE reservations(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    logement INT NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    nom VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (logement) REFERENCES logements(id)
);

-- Lister tous les reservations enregistrés dans la table reservations
SELECT * FROM reservations;