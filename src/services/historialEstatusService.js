const HistorialEstatusPedido = require('../models/HistorialEstatusPedido');
const Pedido = require('../models/Pedido');

class HistorialEstatusService {
  // Registrar cambio de estatus
  static async registrarCambio(idPedido, nuevoEstatusId, estatusAnteriorId = null, usuario = null) {
    try {
      console.log('=== INICIO registrarCambio ===');
      console.log('idPedido:', idPedido);
      console.log('nuevoEstatusId:', nuevoEstatusId);
      console.log('estatusAnteriorId:', estatusAnteriorId);
      
      const historialData = {
        id_pedido: parseInt(idPedido), // Asegurar que sea número
        id_estatusp_anterior: estatusAnteriorId ? parseInt(estatusAnteriorId) : null,
        id_estatusp_nuevo: parseInt(nuevoEstatusId),
        fecha_cambio: new Date().toISOString() // Agregar fecha explícita
      };
      
      console.log('Datos a insertar:', JSON.stringify(historialData, null, 2));
      
      const resultado = await HistorialEstatusPedido.create(historialData);
      console.log('Historial creado:', JSON.stringify(resultado, null, 2));
      console.log('=== FIN registrarCambio ===');
      
      return resultado;
    } catch (error) {
      console.error('❌ ERROR en registrarCambio:', error.message);
      console.error('Stack:', error.stack);
      throw error;
    }
  }

  // Obtener historial de un pedido
  static async obtenerHistorialPorPedido(idPedido) {
    return await HistorialEstatusPedido.findByPedido(idPedido);
  }
}

module.exports = HistorialEstatusService;