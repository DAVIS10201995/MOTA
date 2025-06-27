const FuncionService = require('../services/funcionService');

const FuncionController = {
  create: async (req, res) => {
    try {
      const { n_funcion } = req.body;
      const funcion = await FuncionService.createFuncion(n_funcion);
      res.status(201).json(funcion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const funciones = await FuncionService.getAllFunciones();
      res.json(funciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const funcion = await FuncionService.getFuncionById(id);
      
      if (!funcion) {
        return res.status(404).json({ message: 'Función no encontrada' });
      }
      
      res.json(funcion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { n_funcion } = req.body;
      const funcion = await FuncionService.updateFuncion(id, n_funcion);
      res.json(funcion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await FuncionService.deleteFuncion(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = FuncionController;