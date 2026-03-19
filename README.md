# 🛰️ TP — Système de transmission sécurisé

API REST sécurisée construite avec Node.js, Express et MongoDB.

## 📦 Installation

### Prérequis
- Node.js
- MongoDB avec atlas

### Étapes

1. Clone le projet
2. Installe les dépendances :
```bash
npm install
```

3. Crée un fichier `.env` à la racine :
```env
PORT=3000
JWT_SECRET=super_secret_transmission_key
MONGODB_URI=
```

4. Lance le serveur :
```bash
npm run dev
```

---

## 🌐 Endpoints

### Auth

| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | /auth/register | Créer un compte | ❌ |
| POST | /auth/login | Se connecter | ❌ |

### Messages

| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | /messages | Créer un message | ✅ |
| GET | /messages | Lister les messages | ❌ |
| GET | /messages/:id | Lire un message | ⚠️ obligatoire si lecture_unique |

### Missions

| Méthode | Route | Description | Auth | Rôle |
|---|---|---|---|---|
| POST | /missions | Créer une mission | ✅ | chief |
| GET | /missions | Lister les missions | ✅ | tous |
| GET | /missions/:id | Détail d'une mission | ✅ | tous |
| PATCH | /missions/:id | Modifier une mission | ✅ | tous |

---

## 👤 Rôles

| Rôle | Permissions |
|---|---|
| `agent` | Lire les messages, lire les missions |
| `chief` | Tout ce que l'agent peut faire + créer des missions |

---

## 🔐 Authentification

Toutes les routes protégées nécessitent un header :
```
Authorization: Bearer <token>
```

Le token est obtenu via `POST /auth/login`.

---

## 📁 Structure du projet
```
src/
├── controllers/
│   ├── authController.js
│   ├── messageController.js
│   └── missionController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   ├── Message.js
│   ├── Mission.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── messages.js
│   └── missions.js
└── app.js
```

---

## 📌 Types de messages

| Type | Comportement |
|---|---|
| `public` | Accessible par tous, reste disponible |
| `lecture_unique` | Auth obligatoire, supprimé après lecture |