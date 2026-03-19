const express = require('express');
const router = express.Router();
const { createMessage, getMessages, getMessageById } = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', createMessage);
router.get('/', getMessages);
router.get('/:id', getMessageById);

module.exports = router;