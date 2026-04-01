//L'instruction require() permet d'importer le module.
const http = require('http');

//j'importe l'application express app.js
const app = require('./app');

const numeroPort = 3005;
app.set('port', numeroPort);
const serveur = http.createServer(app);


serveur.listen(numeroPort, () =>{
    console.log("Le serveur ", numeroPort)
})