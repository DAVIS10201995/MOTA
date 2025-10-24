const HistorialEstatusService = require('../services/historialEstatusService');

class HistorialEstatusController {
  // Obtener historial de un pedido
  static async getByPedido(req, res) {
    try {
      const historial = await HistorialEstatusService.obtenerHistorialPorPedido(req.params.idPedido);
      res.json(historial);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = HistorialEstatusController;