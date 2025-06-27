const express = require('express');
const router = express.Router();
const FuncionController = require('../controllers/funcionController');

// CRUD Routes
router.post('/', FuncionController.create); // Create
router.get('/', FuncionController.getAll); // Read all
router.get('/:id', FuncionController.getById); // Read one
router.put('/:id', FuncionController.update); // Update
router.delete('/:id', FuncionController.delete); // Delete

module.exports = router;