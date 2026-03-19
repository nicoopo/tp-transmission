const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['public', 'lecture_unique'],
        default: 'public',
    },
}, {
    timestamps: true, // génère automatiquement createdAt et updatedAt
});

module.exports = mongoose.model('Message', messageSchema);