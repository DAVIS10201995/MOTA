const EstatusP = require('../models/EstatusP');

const EstatusPService = {
  async getAll() {
    try {
      return await EstatusP.getAll();
    } catch (error) {
      throw new Error(`Error al obtener estados: ${error.message}`);
    }
  },

  async getById(id) {
    try {
      const estatus = await EstatusP.getById(id);
      if (!estatus) throw new Error('Estado no encontrado');
      return estatus;
    } catch (error) {
      throw new Error(`Error al obtener estado: ${error.message}`);
    }
  },

  async create(estatusData) {
    try {
      if (!estatusData.n_estatusp || estatusData.n_estatusp.length > 50) {
        throw new Error('El nombre del estado es requerido y debe tener máximo 50 caracteres');
      }
      return await EstatusP.create(estatusData);
    } catch (error) {
      throw new Error(`Error al crear estado: ${error.message}`);
    }
  },

  async update(id, estatusData) {
    try {
      if (estatusData.n_estatusp && estatusData.n_estatusp.length > 50) {
        throw new Error('El nombre del estado debe tener máximo 50 caracteres');
      }
      const updated = await EstatusP.update(id, estatusData);
      if (!updated) throw new Error('Estado no encontrado');
      return updated;
    } catch (error) {
      throw new Error(`Error al actualizar estado: ${error.message}`);
    }
  },

  async delete(id) {
    try {
      const deleted = await EstatusP.delete(id);
      if (!deleted) throw new Error('Estado no encontrado');
      return deleted;
    } catch (error) {
      throw new Error(`Error al eliminar estado: ${error.message}`);
    }
  }
};

module.exports = EstatusPService;