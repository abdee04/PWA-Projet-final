# livresgourmands.net — Projet final PWA (420-WA6-AG)

## Description du projet

**livresgourmands.net** est une plateforme de commerce électronique spécialisée dans la vente de livres de cuisine, adaptée à tous les niveaux : débutants, amateurs et chefs.

Le projet comprend notamment :

- La gestion des utilisateurs et de l'authentification ;
- La gestion des catégories et des ouvrages ;
- La gestion du panier d'achat ;
- La gestion des commandes ;
- La collecte des avis des clients ;
- La gestion et la validation des commentaires ;
- La création de listes de cadeaux personnalisées ;
- Une architecture API REST sécurisée avec JWT.

---

## Fonctionnalités réalisées

### Gestion des utilisateurs

- Inscription d'un utilisateur ;
- Connexion avec JWT ;
- Consultation du profil utilisateur connecté.

### Gestion des catégories

- Création d'une catégorie ;
- Consultation des catégories ;
- Modification d'une catégorie ;
- Suppression d'une catégorie.

### Gestion des ouvrages

- Création d'un ouvrage ;
- Consultation des ouvrages ;
- Consultation d'un ouvrage par son identifiant ;
- Modification d'un ouvrage ;
- Suppression d'un ouvrage.

### Gestion du panier

- Consultation du panier actif ;
- Ajout d'un article au panier ;
- Modification de la quantité d'un article ;
- Suppression d'un article du panier.

### Gestion des commandes

- Création d'une commande ;
- Consultation des commandes ;
- Consultation d'une commande spécifique ;
- Modification du statut d'une commande.

### Gestion des avis

- Ajout d'un avis sur un ouvrage.

### Gestion des commentaires

- Ajout d'un commentaire ;
- Validation d'un commentaire.

### Gestion des listes cadeaux

- Création d'une liste cadeau ;
- Consultation d'une liste cadeau par code de partage.

---

## Technologies utilisées

### Backend

- Node.js
- Express.js

### Base de données

- MySQL
- phpMyAdmin

### Authentification

- JWT (JSON Web Token)
- bcryptjs

### Outils de développement

- Visual Studio Code
- Postman
- Git
- GitHub

---

## Installation du projet

### 1. Cloner le dépôt

```bash
git clone <url-du-projet>
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env`

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=livresgourmands

JWT_SECRET=supersecretkey123
```

### 4. Lancer le serveur

```bash
npm run dev
```

ou

```bash
npm start
```

---

## Structure du projet

Backend
- src
  - controllers
  - routes
  - app.js
- server.js
- package.json
- .env

---

## Membres de l'équipe

- Abderrahmane Atmane
- Enya Angeliny Da Silva Ferreira

---

## Date

Date de réalisation : Automne 2026

---

## Contrôle de version

- Git
- GitHub

---

## API REST développée

### Authentification

POST /api/auth/register
POST /api/auth/login

### Utilisateurs

GET /api/users/me

### Catégories

GET    /api/categories
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
