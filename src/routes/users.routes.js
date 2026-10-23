const express = require("express");

// Création du routeur Express
const router = express.Router();

// Importation du middleware d'authentification
const auth = require("../middlewares/auth");

// Route pour récupérer les informations de l'utilisateur connecté
router.get("/me", auth, (req, res) => {

  // Retourner les informations du token JWT
  res.json(req.user);

});

// Exportation du routeur
module.exports = router;