const Mission = require('../models/Mission');
const User = require('../models/User');

// POST /missions
const createMission = async (req, res) => {
    try {
        const mission = await Mission.create({
            ...req.body,
            createdBy: req.user.id,
        });
        res.status(201).json(mission);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /missions
const getMissions = async (req, res) => {
    try {
        const missions = await Mission.find()
            .populate('createdBy', 'email role')
            .populate('assignedTo', 'email role');
        res.json(missions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /missions/:id
const getMissionById = async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id)
            .populate('createdBy', 'email role')
            .populate('assignedTo', 'email role');

        if (!mission) {
            return res.status(404).json({ error: 'Mission introuvable' });
        }

        res.json(mission);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PATCH /missions/:id
const updateMission = async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id);

        if (!mission) {
            return res.status(404).json({ error: 'Mission introuvable' });
        }

        // Vérification que l'assigné existe si fourni
        if (req.body.assignedTo) {
            const user = await User.findById(req.body.assignedTo);
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur introuvable' });
            }
        }
        Object.assign(mission, req.body);
        await mission.save();
        const updated = await Mission.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('createdBy', 'email role')
            .populate('assignedTo', 'email role');

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { createMission, getMissions, getMissionById, updateMission };