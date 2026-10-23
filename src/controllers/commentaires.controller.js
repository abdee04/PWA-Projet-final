// Connexion à la base de données
const pool = require("../config/db");

// Créer un nouveau commentaire
const createCommentaire = async (req, res) => {

    // Récupérer l'identifiant du client connecté
    const clientId = req.user.id;

    // Récupérer l'identifiant de l'ouvrage
    const ouvrageId = req.params.id;

    // Récupérer le contenu du commentaire
    const { contenu } = req.body;

    // Ajouter le commentaire dans la base de données
    await pool.query(
        `
        INSERT INTO commentaires
        (
            client_id,
            ouvrage_id,
            contenu,
            valide
        )
        VALUES (?, ?, ?, false)
        `,
        [
            clientId,
            ouvrageId,
            contenu
        ]
    );

    // Retourner un message de succès
    res.status(201).json({
        message: "Comment submitted"
    });
};

// Valider un commentaire
const validateCommentaire = async (req, res) => {

    // Récupérer l'identifiant du commentaire
    const commentaireId = req.params.id;

    // Récupérer l'identifiant du validateur
    const userId = req.user.id;

    // Mettre à jour le statut du commentaire
    await pool.query(
        `
        UPDATE commentaires
        SET
            valide = true,
            date_validation = NOW(),
            valide_par = ?
        WHERE id = ?
        `,
        [
            userId,
            commentaireId
        ]
    );

    // Retourner un message de succès
    res.json({
        message: "Comment validated"
    });
};

// Exporter les fonctions
module.exports = {
    createCommentaire,
    validateCommentaire
};