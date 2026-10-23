// Connexion à la base de données
const pool = require("../config/db");

// Récupérer toutes les commandes de l'utilisateur connecté
const getCommandes = async (req, res) => {

    // Récupérer l'identifiant du client connecté
    const clientId = req.user.id;

    // Rechercher les commandes du client
    const [commandes] = await pool.query(
        `
        SELECT *
        FROM commandes
        WHERE client_id = ?
        `,
        [clientId]
    );

    // Retourner les commandes
    res.json(commandes);
};

// Créer une nouvelle commande
const createCommande = async (req, res) => {

    // Récupérer l'identifiant du client connecté
    const clientId = req.user.id;

    // Récupérer les informations de livraison
    const {
        adresse_livraison,
        mode_livraison,
        mode_paiement
    } = req.body;

    // Rechercher le panier actif du client
    const [paniers] = await pool.query(
        `
        SELECT *
        FROM panier
        WHERE client_id = ?
        AND actif = true
        `,
        [clientId]
    );

    // Vérifier si un panier existe
    if (paniers.length === 0) {
        return res.status(404).json({
            message: "No active cart found"
        });
    }

    const panier = paniers[0];

    // Récupérer les articles du panier
    const [items] = await pool.query(
        `
        SELECT *
        FROM panier_items
        WHERE panier_id = ?
        `,
        [panier.id]
    );

    // Vérifier si le panier est vide
    if (items.length === 0) {
        return res.status(400).json({
            message: "Cart is empty"
        });
    }

    // Calculer le montant total de la commande
    let total = 0;

    items.forEach(item => {
        total += item.quantite * item.prix_unitaire;
    });

    // Ajouter la commande dans la base de données
    const [result] = await pool.query(
        `
        INSERT INTO commandes
        (
            client_id,
            total,
            adresse_livraison,
            mode_livraison,
            mode_paiement
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            clientId,
            total,
            adresse_livraison,
            mode_livraison,
            mode_paiement
        ]
    );

    // Récupérer l'identifiant de la commande créée
    const commandeId = result.insertId;

    // Ajouter les articles dans les détails de commande
    for (const item of items) {

        await pool.query(
            `
            INSERT INTO commande_items
            (
                commande_id,
                ouvrage_id,
                quantite,
                prix_unitaire
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                commandeId,
                item.ouvrage_id,
                item.quantite,
                item.prix_unitaire
            ]
        );
    }

    // Retourner un message de succès
    res.status(201).json({
        message: "Order created",
        commandeId,
        total
    });
};

// Récupérer une commande par son identifiant
const getCommandeById = async (req, res) => {

    // Récupérer l'identifiant de la commande
    const { id } = req.params;

    // Rechercher la commande
    const [commande] = await pool.query(
        `
        SELECT *
        FROM commandes
        WHERE id = ?
        `,
        [id]
    );

    // Retourner la commande trouvée
    res.json(commande[0]);
};

// Modifier le statut d'une commande
const updateCommandeStatus = async (req, res) => {

    // Récupérer l'identifiant de la commande
    const { id } = req.params;

    // Récupérer le nouveau statut
    const { statut } = req.body;

    // Mettre à jour le statut dans la base de données
    await pool.query(
        `
        UPDATE commandes
        SET statut = ?
        WHERE id = ?
        `,
        [statut, id]
    );

    // Retourner un message de succès
    res.json({
        message: "Order status updated"
    });
};

// Exporter les fonctions
module.exports = {
    getCommandes,
    createCommande,
    getCommandeById,
    updateCommandeStatus
};