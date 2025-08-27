const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');

// Rutas básicas CRUD
router.post('/', PedidoController.create);
router.get('/', PedidoController.getAll);
router.get('/:id', PedidoController.getById);
router.put('/:id', PedidoController.update);
router.delete('/:id', PedidoController.delete);

// Rutas especializadas
router.put('/:id/estatus', PedidoController.changeStatus);
router.get('/cliente/:idCliente', PedidoController.getByCliente);
router.put('/:id/productos', PedidoController.updateProducts);

router.get('/estatus/:idEstatus', PedidoController.getByEstatus);
router.get('/prioridad/:idPrioridad', PedidoController.getByPrioridad);

module.exports = router;