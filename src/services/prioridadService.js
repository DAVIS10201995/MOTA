const supabase = require('../config/SupabaseClient');
const Prioridad = require('../models/Prioridad');

const PrioridadService = {
  async crearPrioridad(prioridadData) {
    const { data, error } = await supabase
      .from(Prioridad.tableName)
      .insert([prioridadData])
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async obtenerTodas() {
    const { data, error } = await supabase
      .from(Prioridad.tableName)
      .select('*')
      .order('id_prioridad', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from(Prioridad.tableName)
      .select('*')
      .eq('id_prioridad', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async actualizarPrioridad(id, updateData) {
    const { data, error } = await supabase
      .from(Prioridad.tableName)
      .update(updateData)
      .eq('id_prioridad', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async eliminarPrioridad(id) {
    const { error } = await supabase
      .from(Prioridad.tableName)
      .delete()
      .eq('id_prioridad', id);
    
    if (error) throw new Error(error.message);
    return true;
  },

  async existeNombre(nombre, idExcluir = null) {
    let query = supabase
      .from(Prioridad.tableName)
      .select('id_prioridad')
      .eq('n_prioridad', nombre);

    if (idExcluir) {
      query = query.neq('id_prioridad', idExcluir);
    }

    const { data, error } = await query.single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no encontrado
      throw error;
    }
    
    return !!data;
  }
};

module.exports = PrioridadService;