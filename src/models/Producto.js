const supabase = require('../config/SupabaseClient');

const Producto = {
  tableName: 'productos',

  schema: {
    id_producto: { type: 'serial', primaryKey: true },
    n_producto: { type: 'varchar', length: 100, notNull: true },
    descripcion: { type: 'text' },
    created_at: { type: 'timestamp', default: 'CURRENT_TIMESTAMP' }
  },

  // Métodos CRUD
  async getAll() {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order('id_producto', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id_producto', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(productoData) {
    // Validación básica
    if (!productoData.n_producto) {
      throw new Error('El nombre del producto es requerido');
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .insert([productoData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async update(id, productoData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(productoData)
      .eq('id_producto', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async delete(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id_producto', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Métodos adicionales
  async searchByName(name) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .ilike('n_producto', `%${name}%`);
    
    if (error) throw error;
    return data;
  },

  // Validación personalizada si es necesaria
  validateProductName: function(nombre) {
    return nombre && nombre.length >= 3 && nombre.length <= 100;
  }
};

module.exports = Producto;