const supabase = require('../config/supabaseClient');
const Funcion = require('../models/Funcion');

const FuncionService = {
  async createFuncion(n_funcion) {
    const { data, error } = await supabase
      .from(Funcion.tableName)
      .insert([{ n_funcion }])
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async getAllFunciones() {
    const { data, error } = await supabase
      .from(Funcion.tableName)
      .select('*');
    
    if (error) throw new Error(error.message);
    return data;
  },

  async getFuncionById(id) {
    const { data, error } = await supabase
      .from(Funcion.tableName)
      .select('*')
      .eq('id_funcion', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async updateFuncion(id, n_funcion) {
    const { data, error } = await supabase
      .from(Funcion.tableName)
      .update({ n_funcion })
      .eq('id_funcion', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async deleteFuncion(id) {
    const { error } = await supabase
      .from(Funcion.tableName)
      .delete()
      .eq('id_funcion', id);
    
    if (error) throw new Error(error.message);
    return true;
  }
};

module.exports = FuncionService;