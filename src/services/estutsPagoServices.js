const supabase = require('../config/SupabaseClient');
const EstatusPago = require('../models/EstatusPago');

const EstatusPagoService = {
  async crearEstatusPago(estatusData) {
    const { data, error } = await supabase
      .from(EstatusPago.tableName)
      .insert([estatusData])
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async obtenerTodos() {
    const { data, error } = await supabase
      .from(EstatusPago.tableName)
      .select('*')
      .order('id_estatuspago', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from(EstatusPago.tableName)
      .select('*')
      .eq('id_estatuspago', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async actualizarEstatusPago(id, updateData) {
    const { data, error } = await supabase
      .from(EstatusPago.tableName)
      .update(updateData)
      .eq('id_estatuspago', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async eliminarEstatusPago(id) {
    const { error } = await supabase
      .from(EstatusPago.tableName)
      .delete()
      .eq('id_estatuspago', id);
    
    if (error) throw new Error(error.message);
    return true;
  }
};

module.exports = EstatusPagoService;