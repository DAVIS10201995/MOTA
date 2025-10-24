const supabase = require('../config/SupabaseClient');

const HistorialEstatusPedido = {
  tableName: 'historial_estatus_pedido',

  async create(historialData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(historialData)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  async findByPedido(idPedido) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        estatus_anterior:estatus_p!id_estatusp_anterior(n_estatusp),
        estatus_nuevo:estatus_p!id_estatusp_nuevo(n_estatusp)
      `)
      .eq('id_pedido', idPedido)
      .order('fecha_cambio', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = HistorialEstatusPedido;