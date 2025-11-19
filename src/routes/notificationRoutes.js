// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Rutas de notificaciones
router.post('/test/:pedidoId', notificationController.testNotification);
router.get('/user/:userId', notificationController.getUserNotifications);
router.get('/unread-count/:userId', notificationController.getUnreadCount);
router.patch('/mark-read/:notificacionId', notificationController.markAsRead);

module.exports = router;