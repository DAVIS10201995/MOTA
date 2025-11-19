// services/notificationService.js
const Notificacion = require('../models/Notificacion');

const NotificationService = {
  async sendStatusUpdateNotification(pedidoId, nuevoEstatus) {
    try {
      // 1. Obtener información del pedido
      const { data: pedido, error } = await supabase
        .from('pedidos')
        .select(`
          *,
          clientes: id_cliente (id_usuario, nombre, email),
          estatus: id_estatusp (nombre_estatus)
        `)
        .eq('id_pedido', pedidoId)
        .single();

      if (error) throw new Error(error.message);

      // 2. Mapear estatus a mensajes
      const statusMessages = {
        1: { mensaje: 'recibido', titulo: 'Pedido Recibido' },
        2: { mensaje: 'en diseño', titulo: 'En Proceso de Diseño' },
        3: { mensaje: 'en producción', titulo: 'En Producción' },
        4: { mensaje: 'en revisión de calidad', titulo: 'Control de Calidad' },
        5: { mensaje: 'completado', titulo: 'Pedido Completado' },
        6: { mensaje: 'entregado', titulo: 'Pedido Entregado' }
      };

      const statusInfo = statusMessages[nuevoEstatus] || { 
        mensaje: 'actualizado', 
        titulo: 'Actualización de Pedido' 
      };

      // 3. Crear notificación en BD
      const notificacionData = {
        id_usuario: pedido.id_cliente,
        titulo: statusInfo.titulo,
        mensaje: `Tu pedido #${pedidoId} ha sido ${statusInfo.mensaje}`,
        tipo: 'estatus_pedido',
        id_pedido: pedidoId
      };

      const notificacion = await Notificacion.create(notificacionData);

      console.log(`📋 Notificación guardada - Usuario: ${pedido.id_cliente}, Pedido: ${pedidoId}, Estado: ${nuevoEstatus}`);

      return notificacion;

    } catch (error) {
      console.error('Error en notificación:', error);
      throw error;
    }
  },

  async sendCustomNotification(userId, titulo, mensaje, data = {}) {
    try {
      const notificacionData = {
        id_usuario: userId,
        titulo,
        mensaje,
        tipo: data.tipo || 'general',
        id_pedido: data.id_pedido || null
      };

      return await Notificacion.create(notificacionData);
    } catch (error) {
      console.error('Error en notificación personalizada:', error);
      throw error;
    }
  }
};

module.exports = NotificationService;