const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/productoCotroller');

// Middleware de validación opcional
const validateProduct = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body.n_producto) {
      return res.status(400).json({ error: 'El nombre del producto es requerido' });
    }
  }
  next();
};

router.get('/', ProductoController.getAll);
router.get('/search', ProductoController.search);
router.get('/:id', ProductoController.getById);
router.post('/', validateProduct, ProductoController.create);
router.put('/:id', validateProduct, ProductoController.update);
router.delete('/:id', ProductoController.delete);

module.exports = router;