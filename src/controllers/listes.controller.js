// Connexion à la base de données
const pool = require("../config/db");

// Créer une nouvelle liste cadeau
const createListe = async (req, res) => {

    // Récupérer l'identifiant de l'utilisateur connecté
    const userId = req.user.id;

    // Récupérer le nom de la liste
    const { nom } = req.body;

    // Générer un code de partage unique
    const code = Math.random()
        .toString(36)
        .substring(2, 10);

    // Ajouter la liste cadeau dans la base de données
    await pool.query(
        `
        INSERT INTO listes_cadeaux
        (
            nom,
            proprietaire_id,
            code_partage
        )
        VALUES (?, ?, ?)
        `,
        [
            nom,
            userId,
            code
        ]
    );

    // Retourner un message de succès
    res.status(201).json({
        message: "Gift list created",
        code
    });
};

// Rechercher une liste cadeau avec son code de partage
const getListeByCode =
async (req, res) => {

    // Récupérer le code dans l'URL
    const { code } = req.params;

    // Rechercher la liste dans la base de données
    const [liste] = await pool.query(
        `
        SELECT *
        FROM listes_cadeaux
        WHERE code_partage = ?
        `,
        [code]
    );

    // Retourner la liste trouvée
    res.json(liste[0]);
};

// Exporter les fonctions
module.exports = {
    createListe,
    getListeByCode
};