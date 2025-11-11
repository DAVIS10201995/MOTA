const supabase = require('../config/SupabaseClient');

const PedidoProducto = {
  tableName: 'pedidos_productos',

  async addProductToOrder(pedidoProductoData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(pedidoProductoData)
      .select();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async removeProductFromOrder(pedidoId, productoId) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id_pedido', pedidoId)
      .eq('id_producto', productoId);
    
    if (error) throw new Error(error.message);
    return true;
  },

  async getOrderProducts(pedidoId) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        producto:productos(id_producto, n_producto, descripcion, precio)
      `)
      .eq('id_pedido', pedidoId);
    
    if (error) throw new Error(error.message);
    return data;
  },

  async addProductsToOrder(productosData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(productosData)
      .select();

    if (error) throw new Error(error.message);
    return data;
  },

  async updateProductInOrder(pedidoId, productoId, updates) {
    // Si se actualiza la cantidad, el subtotal se recalcula automáticamente
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq('id_pedido', pedidoId)
      .eq('id_producto', productoId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async removeAllProductsFromOrder(pedidoId) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id_pedido', pedidoId);

    if (error) throw new Error(error.message);
    return true;
  },

  async getOrderProductsWithDetails(pedidoId) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        producto:productos(
          n_producto,
          descripcion,
          precio
        )
      `)
      .eq('id_pedido', pedidoId);

    if (error) throw new Error(error.message);
    return data;
  },

  // Nuevo método para obtener el precio actual de un producto
  async getProductPrice(productoId) {
    const { data, error } = await supabase
      .from('productos')
      .select('precio')
      .eq('id_producto', productoId)
      .single();

    if (error) throw new Error(`Error al obtener precio del producto: ${error.message}`);
    return data.precio;
  }
};

module.exports = PedidoProducto;