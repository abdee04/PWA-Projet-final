const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation des fonctions du contrôleur d'authentification
const {
  register,
  login
} = require("../controllers/auth.controller");

// Route pour l'inscription d'un utilisateur
router.post("/register", register);

// Route pour la connexion d'un utilisateur
router.post("/login", login);

// Exportation du routeur
module.exports = router;