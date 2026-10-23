const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation du middleware d'authentification
const auth = require("../middlewares/auth");

// Importation des fonctions du contrôleur des commentaires
const {
    createCommentaire,
    validateCommentaire
} = require("../controllers/commentaires.controller");

// Route pour ajouter un commentaire sur un ouvrage
router.post(
    "/ouvrages/:id/commentaires",
    auth,
    createCommentaire
);

// Route pour valider un commentaire
router.put(
    "/commentaires/:id/valider",
    auth,
    validateCommentaire
);

// Exportation du routeur
module.exports = router;