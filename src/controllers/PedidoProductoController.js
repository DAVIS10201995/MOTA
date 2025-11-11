const PedidoProductoService = require('../services/pedidoProductoService');

class PedidoProductoController {
  // Agregar productos a pedido
  static async addProducts(req, res) {
    try {
      const result = await PedidoProductoService.addProducts(
        req.params.pedidoId,
        req.body // ← Array directo
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar producto en pedido
  static async updateProduct(req, res) {
    try {
      const result = await PedidoProductoService.updateProduct(
        req.params.pedidoId,
        req.params.productoId,
        req.body
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar producto de pedido
  static async removeProduct(req, res) {
    try {
      await PedidoProductoService.removeProduct(
        req.params.pedidoId,
        req.params.productoId
      );
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener productos de pedido
  static async getProducts(req, res) {
    try {
      const result = await PedidoProductoService.getProductsWithDetails(
        req.params.pedidoId
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PedidoProductoController;