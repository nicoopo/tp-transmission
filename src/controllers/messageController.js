const Message = require('../models/Message');

// POST /messages
const createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /messages
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /messages/:id
const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ error: 'Message introuvable' });
        }

        if (message.type === 'lecture_unique') {
            await message.deleteOne();
        }

        res.json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createMessage, getMessages, getMessageById };