const express = require('express');
const router = express.Router();
const PrioridadController = require('../controllers/prioridadController');

router.post('/', PrioridadController.crear);
router.get('/', PrioridadController.obtenerTodas);
router.get('/:id', PrioridadController.obtenerPorId);
router.put('/:id', PrioridadController.actualizar);
router.delete('/:id', PrioridadController.eliminar);

module.exports = router;