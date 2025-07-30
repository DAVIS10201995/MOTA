const ProductoService = require('../services/productoService');

const ProductoController = {
  async getAll(req, res) {
    try {
      const productos = await ProductoService.getAll();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const producto = await ProductoService.getById(req.params.id);
      res.json(producto);
    } catch (error) {
      if (error.message.includes('no encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async create(req, res) {
    try {
      const newProducto = await ProductoService.create(req.body);
      res.status(201).json(newProducto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedProducto = await ProductoService.update(req.params.id, req.body);
      res.json(updatedProducto);
    } catch (error) {
      if (error.message.includes('no encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  },

  async delete(req, res) {
    try {
      const result = await ProductoService.delete(req.params.id);
      res.json({ message: 'Producto eliminado correctamente', data: result });
    } catch (error) {
      if (error.message.includes('no encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async search(req, res) {
    try {
      const productos = await ProductoService.searchByName(req.query.name);
      res.json(productos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = ProductoController;