const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation du middleware d'authentification
const auth = require("../middlewares/auth");

// Importation du contrôleur des avis
const {
    createAvis
} = require("../controllers/avis.controller");

// Route pour ajouter un avis sur un ouvrage
router.post(
    "/ouvrages/:id/avis",
    auth,
    createAvis
);

// Exportation du routeur
module.exports = router;