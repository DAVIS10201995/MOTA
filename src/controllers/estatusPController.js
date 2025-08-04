const EstatusPService = require('../services/estatusPServices');

const EstatusPController = {
  async getAll(req, res) {
    try {
      const estados = await EstatusPService.getAll();
      res.json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const estado = await EstatusPService.getById(req.params.id);
      res.json(estado);
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
      const newEstado = await EstatusPService.create(req.body);
      res.status(201).json(newEstado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedEstado = await EstatusPService.update(req.params.id, req.body);
      res.json(updatedEstado);
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
      const result = await EstatusPService.delete(req.params.id);
      res.json({ message: 'Estado eliminado correctamente', data: result });
    } catch (error) {
      if (error.message.includes('no encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
};

module.exports = EstatusPController;