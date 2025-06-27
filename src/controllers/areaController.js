const AreaService = require('../services/areaService');

const AreaController = {
  create: async (req, res) => {
    try {
      const { n_area } = req.body;
      const area = await AreaService.createArea(n_area);
      res.status(201).json(area);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const areas = await AreaService.getAllAreas();
      res.json(areas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const area = await AreaService.getAreaById(id);
      
      if (!area) {
        return res.status(404).json({ message: 'Área no encontrada' });
      }
      
      res.json(area);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { n_area } = req.body;
      const area = await AreaService.updateArea(id, n_area);
      res.json(area);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await AreaService.deleteArea(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = AreaController;