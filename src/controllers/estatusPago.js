const EstatusPagoService = require('../services/estutsPagoServices');

const EstatusPagoController = {
  crear: async (req, res) => {
    try {
      const { n_estatuspago } = req.body;
      
      if (!n_estatuspago) {
        return res.status(400).json({ error: 'El nombre del estatus es requerido' });
      }

      const nuevoEstatus = await EstatusPagoService.crearEstatusPago({ n_estatuspago });
      res.status(201).json(nuevoEstatus);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  obtenerTodos: async (req, res) => {
    try {
      const estatus = await EstatusPagoService.obtenerTodos();
      res.json(estatus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const estatus = await EstatusPagoService.obtenerPorId(id);
      
      if (!estatus) {
        return res.status(404).json({ message: 'Estatus de pago no encontrado' });
      }
      
      res.json(estatus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { n_estatuspago } = req.body;
      
      if (!n_estatuspago) {
        return res.status(400).json({ error: 'El nombre del estatus es requerido' });
      }

      const estatusActualizado = await EstatusPagoService.actualizarEstatusPago(id, { n_estatuspago });
      res.json(estatusActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      await EstatusPagoService.eliminarEstatusPago(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = EstatusPagoController;