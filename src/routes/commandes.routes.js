const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation du middleware d'authentification
const auth = require("../middlewares/auth");

// Importation des fonctions du contrôleur des commandes
const {
    getCommandes,
    createCommande,
    getCommandeById,
    updateCommandeStatus
} = require("../controllers/commandes.controller");

// Route pour récupérer toutes les commandes du client connecté
router.get("/", auth, getCommandes);

// Route pour récupérer une commande par son identifiant
router.get(
    "/:id",
    auth,
    getCommandeById
);

// Route pour créer une nouvelle commande
router.post(
    "/",
    auth,
    createCommande,
);

// Route pour modifier le statut d'une commande
router.put(
    "/:id/status",
    auth,
    updateCommandeStatus
);

// Exportation du routeur
module.exports = router;