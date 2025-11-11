const supabase = require('../config/SupabaseClient');

const Producto = {
  tableName: 'productos',

  schema: {
    id_producto: { type: 'serial', primaryKey: true },
    n_producto: { type: 'varchar', length: 100, notNull: true },
    descripcion: { type: 'text' },
    precio: { type: 'numeric', default: 0 }, // CAMBIO: cantidad por precio
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

    // Validar que el precio sea un número válido
    if (productoData.precio !== undefined && productoData.precio !== null) {
      const precio = parseFloat(productoData.precio);
      if (isNaN(precio) || precio < 0) {
        throw new Error('El precio debe ser un número válido mayor o igual a 0');
      }
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .insert([productoData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async update(id, productoData) {
    // Validar precio si se está actualizando
    if (productoData.precio !== undefined && productoData.precio !== null) {
      const precio = parseFloat(productoData.precio);
      if (isNaN(precio) || precio < 0) {
        throw new Error('El precio debe ser un número válido mayor o igual a 0');
      }
    }

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

  // Nuevo método para buscar por rango de precios
  async searchByPriceRange(minPrice, maxPrice) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .gte('precio', minPrice)
      .lte('precio', maxPrice);
    
    if (error) throw error;
    return data;
  },

  // Validación personalizada
  validateProductName: function(nombre) {
    return nombre && nombre.length >= 3 && nombre.length <= 100;
  },

  // Nueva validación para precio
  validatePrice: function(precio) {
    const precioNum = parseFloat(precio);
    return !isNaN(precioNum) && precioNum >= 0;
  }
};

module.exports = Producto;