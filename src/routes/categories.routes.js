const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation des fonctions du contrôleur des catégories
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categories.controller");

// Route pour récupérer toutes les catégories
router.get("/", getCategories);

// Route pour ajouter une catégorie
router.post("/", createCategory);

// Route pour modifier une catégorie
router.put("/:id", updateCategory);

// Route pour supprimer une catégorie
router.delete("/:id", deleteCategory);

// Exportation du routeur
module.exports = router;