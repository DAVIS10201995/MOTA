// controllers/notificationController.js
const NotificationService = require('../services/notificationService');
const Notificacion = require('../models/Notificacion');

const notificationController = {
  async testNotification(req, res) {
    try {
      const { pedidoId } = req.params;
      
      const notificacion = await NotificationService.sendStatusUpdateNotification(pedidoId, 2);
      
      res.json({ 
        message: 'Notificación de prueba creada exitosamente',
        data: notificacion
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserNotifications(req, res) {
    try {
      const { userId } = req.params;
      const notificaciones = await Notificacion.findByUserId(userId);
      
      res.json({ 
        userId,
        count: notificaciones.length,
        notificaciones 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async markAsRead(req, res) {
    try {
      const { notificacionId } = req.params;
      const notificacion = await Notificacion.markAsRead(notificacionId);
      
      res.json({ 
        message: 'Notificación marcada como leída',
        data: notificacion 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUnreadCount(req, res) {
    try {
      const { userId } = req.params;
      const count = await Notificacion.getUnreadCount(userId);
      
      res.json({ 
        userId,
        unreadCount: count 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = notificationController;