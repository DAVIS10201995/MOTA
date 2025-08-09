const express = require('express');
const router = express.Router();
const PedidoProductoController = require('../controllers/PedidoProductoController');

// Rutas para gestión de productos en pedidos
router.post('/:pedidoId/productos', PedidoProductoController.addProducts);
router.get('/:pedidoId/productos', PedidoProductoController.getProducts);
router.put('/:pedidoId/productos/:productoId', PedidoProductoController.updateProduct);
router.delete('/:pedidoId/productos/:productoId', PedidoProductoController.removeProduct);

module.exports = router;