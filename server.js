// Charger les variables d'environnement du fichier .env
require("dotenv").config();

// Importer l'application Express
const app = require("./src/app");

// Définir le port du serveur
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {

    // Afficher un message lorsque le serveur est actif
    console.log(`Server running on port ${PORT}`);

});