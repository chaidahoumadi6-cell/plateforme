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
SELECT * FROM client; 

-- Créer la table logement
CREATE TABLE logements(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(150) NOT NULL,
    prix INT NOT NULL
);

-- Ajouter dans la table logements
INSERT INTO logements (nom,prix ) VALUES("Appartement", 15.00);

-- Lister les logements enregistrés dans la table logements
SELECT * FROM logements;


-- Créer la table reservation
CREATE TABLE reservations(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idClient INT FOREIGN KEY ,
    idLogement INT FOREIGN KEY
);

-- Lister tous les reservations enregistrés dans la table reservations
SELECT * FROM reservations;