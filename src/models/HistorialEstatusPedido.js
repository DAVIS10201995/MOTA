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
    // 1. Obtener el historial básico
    const { data: historial, error: histError } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id_pedido', idPedido)
      .order('fecha_cambio', { ascending: false });
    
    if (histError) throw new Error(histError.message);
    
    if (!historial || historial.length === 0) {
      return [];
    }
    
    // 2. Recolectar todos los IDs de estatus (tanto anteriores como nuevos)
    const estatusIds = new Set();
    historial.forEach(h => {
      estatusIds.add(h.id_estatusp_nuevo);
      if (h.id_estatusp_anterior) {
        estatusIds.add(h.id_estatusp_anterior);
      }
    });
    
    // 3. Obtener los nombres de los estatus
    const { data: estatus, error: estError } = await supabase
      .from('estatus_p')
      .select('id_estatusp, n_estatusp')
      .in('id_estatusp', Array.from(estatusIds));
    
    if (estError) throw new Error(estError.message);
    
    // 4. Crear un mapa para búsqueda rápida
    const estatusMap = {};
    estatus.forEach(e => {
      estatusMap[e.id_estatusp] = e;
    });
    
    // 5. Mapear los datos completos
    return historial.map(h => ({
      ...h,
      estatus_anterior: h.id_estatusp_anterior 
        ? estatusMap[h.id_estatusp_anterior] 
        : null,
      estatus_nuevo: estatusMap[h.id_estatusp_nuevo]
    }));
  }
};

module.exports = HistorialEstatusPedido;