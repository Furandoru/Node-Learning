const express = require('express');
const { addProperty, getProperties, getPropertyById, updateProperty, deleteProperty } = require('../Controller/propertyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);
router.post('/add', addProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;    