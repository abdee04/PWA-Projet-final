const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation du middleware d'authentification
const auth = require("../middlewares/auth");

// Importation des fonctions du contrôleur du panier
const {
    getPanier,
    addItemToPanier,
    updatePanierItem,
    deletePanierItem
} = require("../controllers/panier.controller");

// Route pour afficher le panier de l'utilisateur connecté
router.get("/", auth, getPanier);

// Route pour ajouter un article au panier
router.post(
    "/items",
    auth,
    addItemToPanier,
    updatePanierItem
);

// Route pour supprimer un article du panier
router.delete(
    "/items/:id",
    auth,
    deletePanierItem
);

// Exportation du routeur
module.exports = router;