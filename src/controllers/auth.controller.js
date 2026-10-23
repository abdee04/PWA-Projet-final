const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Connexion à la base de données
const pool = require("../config/db");

// Inscription d'un nouvel utilisateur
const register = async (req, res) => {

  try {

    // Récupérer les données du formulaire
    const {
      nom,
      email,
      password,
      role
    } = req.body;

    // Vérifier si l'email existe déjà
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // Chiffrer le mot de passe
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Ajouter l'utilisateur dans la base de données
    await pool.query(
      `
      INSERT INTO users
      (nom,email,password_hash,role)
      VALUES(?,?,?,?)
      `,
      [
        nom,
        email,
        hashedPassword,
        role || "client"
      ]
    );

    // Réponse de succès
    res.status(201).json({
      message: "User created successfully"
    });

  } catch (error) {

    console.error(error);

    // Réponse en cas d'erreur serveur
    res.status(500).json({
      message: "Server error"
    });
  }
};

// Connexion de l'utilisateur
const login = async (req, res) => {

  try {

    // Récupérer les informations de connexion
    const { email, password } = req.body;

    // Rechercher l'utilisateur par email
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // Vérifier si l'utilisateur existe
    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const user = users[0];

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    // Vérifier si le mot de passe est valide
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Générer un token JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h"
      }
    );

    // Retourner le token
    res.json({
      token
    });

  } catch (error) {

    console.error(error);

    // Réponse en cas d'erreur serveur
    res.status(500).json({
      message: "Server error"
    });

  }
};

// Exporter les fonctions
module.exports = {
  register,
  login
};