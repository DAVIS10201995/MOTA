const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');


router.use(express.json());
// Rutas especializadas (deben ir PRIMERO)
router.get('/cliente/:idCliente', PedidoController.getByCliente);
router.get('/estatus/:idEstatus', PedidoController.getByEstatus);
router.get('/prioridad/:idPrioridad', PedidoController.getByPrioridad);

// Rutas básicas CRUD
router.post('/', PedidoController.create);
router.get('/', PedidoController.getAll);
router.get('/:id', PedidoController.getById); // Esta debe ir después de las específicas
router.put('/:id', PedidoController.update);
router.delete('/:id', PedidoController.delete);

// Rutas de acción sobre pedido específico
router.put('/:id/estatus', PedidoController.changeStatus);
router.put('/:id/productos', PedidoController.updateProducts);

module.exports = router;