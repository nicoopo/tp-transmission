const express = require('express');
const router = express.Router();
const { createMission, getMissions, getMissionById, updateMission } = require('../controllers/missionController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Toutes les routes nécessitent auth
router.use(authMiddleware);

router.post('/', roleMiddleware('chief'), createMission); // chef uniquement
router.get('/', getMissions);
router.get('/:id', getMissionById);
router.patch('/:id', updateMission);

module.exports = router;