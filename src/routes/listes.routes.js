const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation du middleware d'authentification
const auth = require("../middlewares/auth");

// Importation des fonctions du contrôleur des listes cadeaux
const {
    createListe,
    getListeByCode
} = require("../controllers/listes.controller");

// Route pour créer une nouvelle liste cadeau
router.post(
    "/",
    auth,
    createListe
);

// Route pour récupérer une liste cadeau à l'aide du code de partage
router.get(
    "/:code",
    getListeByCode
);

// Exportation du routeur
module.exports = router;