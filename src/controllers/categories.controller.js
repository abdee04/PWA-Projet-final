// Connexion à la base de données
const pool = require("../config/db");

// Récupérer toutes les catégories
const getCategories = async (req, res) => {

  // Exécuter la requête pour obtenir les catégories
  const [rows] = await pool.query(
    "SELECT * FROM categories"
  );

  // Retourner les catégories
  res.json(rows);
};

// Ajouter une nouvelle catégorie
const createCategory = async (req, res) => {

  // Récupérer les données de la catégorie
  const { nom, description } = req.body;

  // Insérer la catégorie dans la base de données
  await pool.query(
    `
    INSERT INTO categories
    (nom, description)
    VALUES (?, ?)
    `,
    [nom, description]
  );

  // Retourner un message de succès
  res.status(201).json({
    message: "Category created"
  });
};

// Modifier une catégorie
const updateCategory = async (req, res) => {

  // Récupérer l'identifiant de la catégorie
  const { id } = req.params;

  // Récupérer les nouvelles données
  const { nom, description } = req.body;

  // Mettre à jour la catégorie
  await pool.query(
    `
    UPDATE categories
    SET nom = ?, description = ?
    WHERE id = ?
    `,
    [nom, description, id]
  );

  // Retourner un message de succès
  res.json({
    message: "Category updated"
  });
};

// Supprimer une catégorie
const deleteCategory = async (req, res) => {

  // Récupérer l'identifiant de la catégorie
  const { id } = req.params;

  // Supprimer la catégorie de la base de données
  await pool.query(
    "DELETE FROM categories WHERE id = ?",
    [id]
  );

  // Retourner un message de succès
  res.json({
    message: "Category deleted"
  });
};

// Exporter les fonctions
module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};