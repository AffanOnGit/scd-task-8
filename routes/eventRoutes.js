import express from 'express';
import Event from '../models/event.js';
import { protect } from '../config/authmiddleWare.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
    const { name, description, date, time, category, reminder } = req.body;
    const event = new Event({
        name,
        description,
        date,
        time,
        category,
        reminder,
        user: req.user._id,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
});

router.get('/', protect, async (req, res) => {
    const events = await Event.find({ user: req.user._id }).sort({ date: 1 });
    res.json(events);
});

export default router;