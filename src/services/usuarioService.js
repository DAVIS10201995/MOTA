const supabase = require('../config/SupabaseClient');
const Usuario = require('../models/Usuario');

const UsuarioService = {
  async crearUsuario(usuarioData) {
    // Validar correo
    if (!Usuario.validateEmail(usuarioData.correo)) {
      throw new Error('Formato de correo electrónico inválido');
    }

    // Verificar unicidad del correo
    const { data: existe, error: errorConsulta } = await supabase
      .from(Usuario.tableName)
      .select('correo')
      .eq('correo', usuarioData.correo)
      .single();

    if (existe) throw new Error('El correo electrónico ya está registrado');

    if (!usuarioData.estado) {
      usuarioData.estado = 'activo';
    }

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
      `).order('estado',{ ascending: true});
    
    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerActivos() {
    const { data, error } = await supabase
      .from(Usuario.tableName)
      .select(`
        *,
        area: id_area (id_area, n_area),
        funcion: id_funcion (id_funcion, n_funcion)
      `)
      .eq('estado', 'activo');
    
    if (error) throw new Error(error.message);
    return data;
  },

  async suspenderUsuario(id) {
    const { data, error } = await supabase
      .from(Usuario.tableName)
      .update({ estado: 'suspendido' })
      .eq('id_usuario', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async activarUsuario(id) {
    const { data, error } = await supabase
      .from(Usuario.tableName)
      .update({ estado: 'activo' })
      .eq('id_usuario', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
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

  async eliminarUsuario(id) {
    const { error } = await supabase
      .from(Usuario.tableName)
      .delete()
      .eq('id_usuario', id);
    
    if (error) throw new Error(error.message);
    return true;
  },
  
  async actualizarUsuario(id, updateData) {
    if (updateData.correo) {
      if (!Usuario.validateEmail(updateData.correo)) {
        throw new Error('Formato de correo electrónico inválido');
      }
      
      // Verificar que el nuevo correo no esté en uso por otro usuario
      const { data: existe, error: errorConsulta } = await supabase
        .from(Usuario.tableName)
        .select('id_usuario')
        .eq('correo', updateData.correo)
        .neq('id_usuario', id)
        .single();

      if (existe) throw new Error('El correo electrónico ya está registrado por otro usuario');
    }

    const { data, error } = await supabase
      .from(Usuario.tableName)
      .update(updateData)
      .eq('id_usuario', id)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  },

  async buscarPorCorreo(correo) {
    const { data, error } = await supabase
      .from(Usuario.tableName)
      .select()
      .eq('correo', correo)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = UsuarioService;