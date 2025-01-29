// création du service 
const http = require("http");

const app = require("./app");

const server = http.createServer(app);

const date = new Date();

server.listen(3008, () => {
    console.log(date.toLocaleDateString(), date.toLocaleTimeString(), "Le serveur est activé au port :", 3008);
});