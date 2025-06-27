const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// CRUD básico
router.post('/', UsuarioController.crear);
router.get('/', UsuarioController.obtenerTodos);
router.get('/:id', UsuarioController.obtenerPorId);
router.put('/:id', UsuarioController.actualizar);
router.delete('/:id', UsuarioController.eliminar);

// Ruta adicional para login
router.post('/login', UsuarioController.login);

module.exports = router;