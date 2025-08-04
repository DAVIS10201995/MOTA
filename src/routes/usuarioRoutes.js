const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// CRUD básico
router.get('/activos', UsuarioController.obtenerActivos); // Nueva ruta
router.put('/:id/suspender', UsuarioController.suspender); // Nueva ruta
router.put('/:id/activar', UsuarioController.activar); // Nueva ruta
router.post('/', UsuarioController.crear);
router.get('/', UsuarioController.obtenerTodos);
router.get('/:id', UsuarioController.obtenerPorId);
router.put('/:id', UsuarioController.actualizar);
router.delete('/:id', UsuarioController.eliminar);

// Autenticación
router.post('/login', UsuarioController.login);

// Nueva ruta para verificar disponibilidad de correo
router.get('/verificar-correo/:correo', UsuarioController.verificarCorreo);

module.exports = router;