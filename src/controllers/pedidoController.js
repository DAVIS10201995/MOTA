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

  // Cambiar estatus del pedido
  static async changeStatus(req, res) {
    try {
      console.log('=== PETICIÓN changeStatus ===');
      console.log('Params:', req.params);
      console.log('Body:', req.body);
      
      const id = req.params.id;
      const id_estatusp = req.body.id_estatusp;
      
      // Validaciones
      if (!id) {
        return res.status(400).json({ error: 'ID de pedido requerido' });
      }
      
      if (!id_estatusp) {
        return res.status(400).json({ 
          error: 'id_estatusp es requerido en el body',
          received: req.body 
        });
      }
      
      if (isNaN(id_estatusp)) {
        return res.status(400).json({ 
          error: 'id_estatusp debe ser un número válido',
          received: id_estatusp 
        });
      }
      
      console.log('Llamando a PedidoService.changeStatus...');
      const result = await PedidoService.changeStatus(id, id_estatusp);
      
      console.log('Resultado exitoso:', result);
      res.json(result);
    } catch (error) {
      console.error('❌ ERROR en controller:', error);
      res.status(400).json({ 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }

  // Obtener pedidos por prioridad
  static async getByPrioridad(req, res) {
    try {
      const pedidos = await PedidoService.getPedidosByPrioridad(req.params.idPrioridad);
      res.json(pedidos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener pedidos por cliente (NUEVO MÉTODO)
  static async getByCliente(req, res) {
    try {
      const pedidos = await PedidoService.getPedidosByCliente(req.params.idCliente);
      res.json(pedidos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener pedidos por estatus (NUEVO MÉTODO)
  static async getByEstatus(req, res) {
    try {
      const pedidos = await PedidoService.getPedidosByEstatus(req.params.idEstatus);
      res.json(pedidos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PedidoController;