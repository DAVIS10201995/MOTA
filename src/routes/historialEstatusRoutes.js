const express = require('express');
const router = express.Router();
const HistorialEstatusController = require('../controllers/historialEstatusController');

router.get('/pedido/:idPedido', HistorialEstatusController.getByPedido);

module.exports = router;