const jwt = require("jsonwebtoken");

// Middleware de vérification du token JWT
const auth = (req, res, next) => {

  // Récupérer l'en-tête Authorization
  const header = req.headers.authorization;

  // Vérifier si un token a été envoyé
  if (!header) {
    return res.status(401).json({
      message: "Access denied"
    });
  }

  // Extraire le token de l'en-tête
  const token = header.split(" ")[1];

  try {

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Ajouter les informations de l'utilisateur à la requête
    req.user = decoded;

    // Passer au middleware suivant
    next();

  } catch (error) {

    // Retourner une erreur si le token est invalide
    return res.status(401).json({
      message: "Invalid token"
    });

  }
};

// Exporter le middleware
module.exports = auth;