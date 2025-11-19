// models/Notificacion.js
const supabase = require('../config/SupabaseClient');

const Notificacion = {
  tableName: 'notificaciones',

  async create(notificacionData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(notificacionData)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findByUserId(userId) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id_usuario', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data;
  },

  async markAsRead(notificacionId) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update({ leida: true })
      .eq('id_notificacion', notificacionId)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async getUnreadCount(userId) {
    const { count, error } = await supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .eq('id_usuario', userId)
      .eq('leida', false);
    
    if (error) throw new Error(error.message);
    return count;
  }
};

module.exports = Notificacion;