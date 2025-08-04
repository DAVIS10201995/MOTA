const PrioridadService = require('../services/prioridadService');

const PrioridadController = {
  crear: async (req, res) => {
    try {
      const { n_prioridad } = req.body;
      
      if (!n_prioridad) {
        return res.status(400).json({ error: 'El nombre de la prioridad es requerido' });
      }

      // Verificar si ya existe una prioridad con ese nombre
      const existe = await PrioridadService.existeNombre(n_prioridad);
      if (existe) {
        return res.status(400).json({ error: 'Ya existe una prioridad con ese nombre' });
      }

      const nuevaPrioridad = await PrioridadService.crearPrioridad({ n_prioridad });
      res.status(201).json(nuevaPrioridad);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  obtenerTodas: async (req, res) => {
    try {
      const prioridades = await PrioridadService.obtenerTodas();
      res.json(prioridades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const prioridad = await PrioridadService.obtenerPorId(id);
      
      if (!prioridad) {
        return res.status(404).json({ message: 'Prioridad no encontrada' });
      }
      
      res.json(prioridad);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { n_prioridad } = req.body;
      
      if (!n_prioridad) {
        return res.status(400).json({ error: 'El nombre de la prioridad es requerido' });
      }

      // Verificar si ya existe otra prioridad con ese nombre
      const existe = await PrioridadService.existeNombre(n_prioridad, id);
      if (existe) {
        return res.status(400).json({ error: 'Ya existe otra prioridad con ese nombre' });
      }

      const prioridadActualizada = await PrioridadService.actualizarPrioridad(id, { n_prioridad });
      res.json(prioridadActualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      await PrioridadService.eliminarPrioridad(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PrioridadController;