const express = require('express');
const router = express.Router();
const EstatusPController = require('../controllers/estatusPController');

// Validación simple
const validateEstatus = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body.n_estatusp) {
      return res.status(400).json({ error: 'El nombre del estado es requerido' });
    }
  }
  next();
};

router.get('/', EstatusPController.getAll);
router.get('/:id', EstatusPController.getById);
router.post('/', validateEstatus, EstatusPController.create);
router.put('/:id', validateEstatus, EstatusPController.update);
router.delete('/:id', EstatusPController.delete);

module.exports = router;