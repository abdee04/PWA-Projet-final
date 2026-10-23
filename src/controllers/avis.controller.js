// Connexion à la base de données
const pool = require("../config/db");

// Ajouter un avis sur un ouvrage
const createAvis = async (req, res) => {

    // Récupérer l'identifiant du client connecté
    const clientId = req.user.id;

    // Récupérer l'identifiant de l'ouvrage
    const ouvrageId = req.params.id;

    // Récupérer la note et le commentaire
    const { note, commentaire } = req.body;

    // Ajouter l'avis dans la base de données
    await pool.query(
        `
        INSERT INTO avis
        (
            client_id,
            ouvrage_id,
            note,
            commentaire
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            clientId,
            ouvrageId,
            note,
            commentaire
        ]
    );

    // Retourner un message de succès
    res.status(201).json({
        message: "Review added"
    });
};

// Exporter la fonction
module.exports = {
    createAvis
};