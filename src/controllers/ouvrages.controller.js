// Connexion à la base de données
const pool = require("../config/db");

// Récupérer tous les ouvrages
const getOuvrages = async (req, res) => {

    // Exécuter la requête pour récupérer les ouvrages
    const [rows] = await pool.query(
        "SELECT * FROM ouvrages"
    );

    // Retourner la liste des ouvrages
    res.json(rows);
};

// Récupérer un ouvrage par son identifiant
const getOuvrageById = async (req, res) => {

    // Récupérer l'identifiant de l'ouvrage
    const { id } = req.params;

    // Rechercher l'ouvrage dans la base de données
    const [rows] = await pool.query(
        "SELECT * FROM ouvrages WHERE id = ?",
        [id]
    );

    // Retourner l'ouvrage trouvé
    res.json(rows[0]);
};

// Ajouter un nouvel ouvrage
const createOuvrage = async (req, res) => {

    // Récupérer les informations de l'ouvrage
    const {
        titre,
        auteur,
        isbn,
        description,
        prix,
        stock,
        categorie_id
    } = req.body;

    // Ajouter l'ouvrage dans la base de données
    await pool.query(
        `INSERT INTO ouvrages
        (titre,auteur,isbn,description,prix,stock,categorie_id)
        VALUES (?,?,?,?,?,?,?)`,
        [
            titre,
            auteur,
            isbn,
            description,
            prix,
            stock,
            categorie_id
        ]
    );

    // Retourner un message de succès
    res.status(201).json({
        message: "Ouvrage created"
    });
};

// Modifier un ouvrage
const updateOuvrage = async (req, res) => {

    // Récupérer l'identifiant de l'ouvrage
    const { id } = req.params;

    // Récupérer les nouvelles informations
    const {
        titre,
        auteur,
        isbn,
        description,
        prix,
        stock,
        categorie_id
    } = req.body;

    // Mettre à jour l'ouvrage dans la base de données
    await pool.query(
        `UPDATE ouvrages
         SET titre=?,
             auteur=?,
             isbn=?,
             description=?,
             prix=?,
             stock=?,
             categorie_id=?
         WHERE id=?`,
        [
            titre,
            auteur,
            isbn,
            description,
            prix,
            stock,
            categorie_id,
            id
        ]
    );

    // Retourner un message de succès
    res.json({
        message: "Ouvrage updated"
    });
};

// Supprimer un ouvrage
const deleteOuvrage = async (req, res) => {

    // Récupérer l'identifiant de l'ouvrage
    const { id } = req.params;

    // Supprimer l'ouvrage de la base de données
    await pool.query(
        "DELETE FROM ouvrages WHERE id=?",
        [id]
    );

    // Retourner un message de succès
    res.json({
        message: "Ouvrage deleted"
    });
};

// Exporter les fonctions
module.exports = {
    getOuvrages,
    getOuvrageById,
    createOuvrage,
    updateOuvrage,
    deleteOuvrage
};