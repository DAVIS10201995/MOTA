const supabase = require('../config/SupabaseClient');

const EstatusP = {
  tableName: 'estatus_p',

  schema: {
    id_estatusp: { type: 'serial', primaryKey: true },
    n_estatusp: { type: 'varchar', length: 50, notNull: true }
  },

  // Métodos CRUD
  async getAll() {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order('id_estatusp', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id_estatusp', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(estatusData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([estatusData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async update(id, estatusData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(estatusData)
      .eq('id_estatusp', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async delete(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id_estatusp', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

module.exports = EstatusP;