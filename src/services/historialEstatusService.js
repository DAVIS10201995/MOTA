const HistorialEstatusPedido = require('../models/HistorialEstatusPedido');
const Pedido = require('../models/Pedido');

class HistorialEstatusService {
  // Registrar cambio de estatus
  static async registrarCambio(idPedido, nuevoEstatusId, usuario = null) {
    const historialData = {
      id_pedido: idPedido,
      id_estatusp_anterior: null,
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