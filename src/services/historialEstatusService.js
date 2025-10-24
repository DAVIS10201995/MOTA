const HistorialEstatusPedido = require('../models/HistorialEstatusPedido');
const Pedido = require('../models/Pedido');

class HistorialEstatusService {
  // Registrar cambio de estatus
  static async registrarCambio(idPedido, nuevoEstatusId, estatusAnteriorId = null, usuario = null) {
    const historialData = {
      id_pedido: idPedido,
      id_estatusp_anterior: estatusAnteriorId, // Ahora se recibe como parámetro
      id_estatusp_nuevo: nuevoEstatusId
    };

    return await HistorialEstatusPedido.create(historialData);
  }

  // Obtener historial de un pedido
  static async obtenerHistorialPorPedido(idPedido) {
    return await HistorialEstatusPedido.findByPedido(idPedido);
  }
}

module.exports = HistorialEstatusService;