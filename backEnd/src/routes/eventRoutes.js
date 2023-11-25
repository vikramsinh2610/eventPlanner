const express = require('express');
const  eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, eventController.createEvent);
router.get('/list', authMiddleware, eventController.getAllEvent);
router.get('/:id', authMiddleware, eventController.getEvent);
router.put('/update/:id', authMiddleware, eventController.updateEvent);

module.exports = router;
