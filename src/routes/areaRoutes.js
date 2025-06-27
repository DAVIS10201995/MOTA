const express = require('express');
const router = express.Router();
const AreaController = require('../controllers/areaController');

// CRUD Routes
router.post('/', AreaController.create); // Create
router.get('/', AreaController.getAll); // Read all
router.get('/:id', AreaController.getById); // Read one
router.put('/:id', AreaController.update); // Update
router.delete('/:id', AreaController.delete); // Delete

module.exports = router;