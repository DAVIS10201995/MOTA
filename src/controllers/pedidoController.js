const PedidoService = require('../services/pedidosService');

class PedidoController {
  // Crear nuevo pedido
  static async create(req, res) {
    try {
      const { productos, ...pedidoData } = req.body;
      const result = await PedidoService.createPedido(pedidoData, productos);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener pedido por ID
  static async getById(req, res) {
    try {
      const pedido = await PedidoService.getPedidoWithDetails(req.params.id);
      res.json(pedido);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Actualizar información del pedido
  static async update(req, res) {
    try {
      const updated = await PedidoService.updatePedido(
        req.params.id, 
        req.body
      );
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar productos del pedido
  static async updateProducts(req, res) {
    try {
      const result = await PedidoService.updatePedidoProducts(
        req.params.id,
        req.body.productos
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar pedido
  static async delete(req, res) {
    try {
      await PedidoService.deletePedido(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Listar pedidos paginados
  static async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await PedidoService.getAllPedidos(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Cambiar estatus de pedido
  static async changeStatus(req, res) {
    try {
      const result = await PedidoService.changeStatus(
        req.params.id,
        req.body.id_estatusp
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener pedidos por cliente
  static async getByCliente(req, res) {
    try {
      const pedidos = await PedidoService.getPedidosByCliente(req.params.idCliente);
      res.json(pedidos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PedidoController;