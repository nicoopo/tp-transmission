const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// 👇 Ajoute ces deux lignes
const messageRoutes = require('./routes/messages');
const authRoutes = require('./routes/auth');
app.use('/messages', messageRoutes);
app.use('/auth', authRoutes);
const missionRoutes = require('./routes/missions');
app.use('/missions', missionRoutes);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connecté'))
    .catch((err) => console.error('❌ Erreur MongoDB :', err));

app.get('/', (req, res) => {
    res.json({ message: '🛰️ Système de transmission en ligne' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));