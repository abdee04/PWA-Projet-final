const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation des fonctions du contrôleur des ouvrages
const {
    getOuvrages,
    getOuvrageById,
    createOuvrage,
    updateOuvrage,
    deleteOuvrage
} = require("../controllers/ouvrages.controller");

// Route pour récupérer tous les ouvrages
router.get("/", getOuvrages);

// Route pour récupérer un ouvrage par son identifiant
router.get("/:id", getOuvrageById);

// Route pour ajouter un nouvel ouvrage
router.post("/", createOuvrage);

// Route pour modifier un ouvrage
router.put("/:id", updateOuvrage);

// Route pour supprimer un ouvrage
router.delete("/:id", deleteOuvrage);

// Exportation du routeur
module.exports = router;