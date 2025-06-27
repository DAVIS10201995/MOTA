const supabase = require('../config/SupabaseClient');
const Usuario = require('../models/Usuario');

const UsuarioService = {
  async crearUsuario(usuarioData) {
    const { data, error } = await supabase
      .from(Usuario.tableName)
      .insert([usuarioData])
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async obtenerTodos() {
    const { data, error } = await supabase
      .from(Usuario.tableName)
      .select(`
        *,
        area: id_area (id_area, n_area),
        funcion: id_funcion (id_funcion, n_funcion)
      `);
    
    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from(Usuario.tableName)
      .select(`
        *,
        area: id_area (id_area, n_area),
        funcion: id_funcion (id_funcion, n_funcion)
      `)
      .eq('id_usuario', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async actualizarUsuario(id, updateData) {
    const { data, error } = await supabase
      .from(Usuario.tableName)
      .update(updateData)
      .eq('id_usuario', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async eliminarUsuario(id) {
    const { error } = await supabase
      .from(Usuario.tableName)
      .delete()
      .eq('id_usuario', id);
    
    if (error) throw new Error(error.message);
    return true;
  },

  async buscarPorCredenciales(email, contrasena) {
    const { data, error } = await supabase
      .from(Usuario.tableName)
      .select()
      .eq('email', email)
      .eq('contrasena', contrasena)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = UsuarioService;