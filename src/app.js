const express = require("express");

// Importation des routes
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const categoriesRoutes = require("./routes/categories.routes");
const ouvragesRoutes = require("./routes/ouvrages.routes");
const panierRoutes = require("./routes/panier.routes");
const commandesRoutes = require("./routes/commandes.routes");
const avisRoutes = require("./routes/avis.routes");
const commentairesRoutes = require("./routes/commentaires.routes");
const listesRoutes = require("./routes/listes.routes");

const app = express();

// Permet de lire le JSON envoyé par le client
app.use(express.json());

// Route principale de test
app.get("/", (req, res) => {
  res.send("Livres Gourmands API");
});

// Routes d'authentification
app.use("/api/auth", authRoutes);

// Routes des utilisateurs
app.use("/api/users", usersRoutes);

// Routes des catégories
app.use("/api/categories", categoriesRoutes);

// Routes des ouvrages
app.use("/api/ouvrages", ouvragesRoutes);

// Routes du panier
app.use("/api/panier", panierRoutes);

// Routes des commandes
app.use("/api/commandes", commandesRoutes);

// Routes des avis
app.use("/api", avisRoutes);

// Routes des commentaires
app.use("/api", commentairesRoutes);

// Routes des listes cadeaux
app.use("/api/listes", listesRoutes);

// Export de l'application
module.exports = app;
