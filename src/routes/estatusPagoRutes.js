const express = require('express');
const router = express.Router();
const EstatusPagoController = require('../controllers/estatusPago');

router.post('/', EstatusPagoController.crear);
router.get('/', EstatusPagoController.obtenerTodos);
router.get('/:id', EstatusPagoController.obtenerPorId);
router.put('/:id', EstatusPagoController.actualizar);
router.delete('/:id', EstatusPagoController.eliminar);

module.exports = router;