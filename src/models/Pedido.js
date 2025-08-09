const supabase = require('../config/SupabaseClient');

const Pedido = {
  tableName: 'pedidos',

  async create(pedidoData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(pedidoData)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id_pedido', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq('id_pedido', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id_pedido', id);
    
    if (error) throw new Error(error.message);
    return true;
  },

  async findAll() {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*');
    
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = Pedido;