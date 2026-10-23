// Connexion à la base de données
const pool = require("../config/db");

// Récupérer le panier actif de l'utilisateur connecté
const getPanier = async (req, res) => {

    // Récupérer l'identifiant du client connecté
    const clientId = req.user.id;

    // Rechercher le panier actif
    const [rows] = await pool.query(
        `
        SELECT *
        FROM panier
        WHERE client_id = ?
        AND actif = true
        `,
        [clientId]
    );

    // Retourner le panier
    res.json(rows);
};

// Ajouter un article au panier
const addItemToPanier = async (req, res) => {

    // Récupérer l'identifiant du client connecté
    const clientId = req.user.id;

    // Récupérer l'identifiant de l'ouvrage et la quantité
    const { ouvrage_id, quantite } = req.body;

    // Rechercher le panier actif
    const [paniers] = await pool.query(
        `
        SELECT * FROM panier
        WHERE client_id = ?
        AND actif = true
        `,
        [clientId]
    );

    const panier = paniers[0];

    // Récupérer le prix de l'ouvrage
    const [ouvrages] = await pool.query(
        `
        SELECT prix
        FROM ouvrages
        WHERE id = ?
        `,
        [ouvrage_id]
    );

    const prix = ouvrages[0].prix;

    // Ajouter l'article dans le panier
    await pool.query(
        `
        INSERT INTO panier_items
        (
            panier_id,
            ouvrage_id,
            quantite,
            prix_unitaire
        )
        VALUES (?,?,?,?)
        `,
        [
            panier.id,
            ouvrage_id,
            quantite,
            prix
        ]
    );

    // Retourner un message de succès
    res.status(201).json({
        message: "Item added to cart"
    });
};

// Modifier la quantité d'un article du panier
const updatePanierItem = async (req, res) => {

    // Récupérer l'identifiant de l'article
    const { id } = req.params;

    // Récupérer la nouvelle quantité
    const { quantite } = req.body;

    // Mettre à jour la quantité dans la base de données
    await pool.query(
        `
        UPDATE panier_items
        SET quantite = ?
        WHERE id = ?
        `,
        [quantite, id]
    );

    // Retourner un message de succès
    res.json({
        message: "Cart item updated"
    });
};

// Supprimer un article du panier
const deletePanierItem = async (req, res) => {

    // Récupérer l'identifiant de l'article
    const { id } = req.params;

    // Supprimer l'article de la base de données
    await pool.query(
        "DELETE FROM panier_items WHERE id = ?",
        [id]
    );

    // Retourner un message de succès
    res.json({
        message: "Item removed from cart"
    });
};

// Exporter les fonctions
module.exports = {
    getPanier,
    addItemToPanier,
    updatePanierItem,
    deletePanierItem
};