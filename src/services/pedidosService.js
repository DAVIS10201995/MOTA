const Pedido = require('../models/Pedido');
const PedidoProducto = require('../models/PedidosProductos');
const supabase = require('../config/SupabaseClient');
const HistorialEstatusService = require('./historialEstatusService');

class PedidoService {
  // Crear pedido con productos
  static async createPedido(pedidoData, productos) {
    const pedido = await Pedido.create(pedidoData);
    
    if (productos && productos.length > 0) {
      const productosData = productos.map(p => ({
        id_pedido: pedido.id_pedido,
        id_producto: p.id_producto,
        cantidad: p.cantidad,
        precio_unitario: p.precio_unitario
      }));
      await PedidoProducto.addProductsToOrder(productosData);
    }
    
    return this.getPedidoWithDetails(pedido.id_pedido);
  }

  // Obtener pedido con detalles completos
  static async getPedidoWithDetails(id) {
    const pedido = await Pedido.findById(id);
    if (!pedido) throw new Error('Pedido no encontrado');

    const productos = await PedidoProducto.getOrderProducts(id);
    const total = productos.reduce((sum, item) => sum + item.subtotal, 0);

    return {
      ...pedido,
      productos,
      total
    };
  }

  // Actualizar pedido (sin productos)
  static async updatePedido(id, updates) {
    return await Pedido.update(id, updates);
  }

  // Actualizar productos del pedido
  static async updatePedidoProducts(id, productos) {
    // Eliminar productos actuales
    await PedidoProducto.removeAllProductsFromOrder(id);
    
    // Agregar nuevos productos
    if (productos && productos.length > 0) {
      const productosData = productos.map(p => ({
        id_pedido: id,
        id_producto: p.id_producto,
        cantidad: p.cantidad,
        precio_unitario: p.precio_unitario
      }));
      await PedidoProducto.addProductsToOrder(productosData);
    }
    
    return this.getPedidoWithDetails(id);
  }

  // Eliminar pedido
  static async deletePedido(id) {
    await PedidoProducto.removeAllProductsFromOrder(id);
    return await Pedido.delete(id);
  }

  // Listar todos los pedidos con información básica
  static async getAllPedidos(page = 1, limit = 10) {
    const { data, error, count } = await supabase
      .from('pedidos')
      .select(`
        *,
        cliente:usuarios!id_cliente(nombre_completo),
        estatus:estatus_p!id_estatusp(n_estatusp)
      `)
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw new Error(error.message);
    
    return {
      data,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  // Cambiar estatus de pedido
  static async changeStatus(id, newStatusId) {
  // 1. PRIMERO obtener el pedido actual para conocer el estatus anterior
  const pedidoActual = await Pedido.findById(id);
  
  if (!pedidoActual) {
    throw new Error('Pedido no encontrado');
  }
  
  const estatusAnteriorId = pedidoActual.id_estatusp;
  
  // 2. Actualizar el pedido con el nuevo estatus
  const pedidoActualizado = await Pedido.update(id, { 
    id_estatusp: newStatusId 
  });
  
  // 3. Registrar el cambio en el historial CON el estatus anterior
  await HistorialEstatusService.registrarCambio(
    id, 
    newStatusId, 
    estatusAnteriorId // Pasar el estatus anterior
  );
  
  return pedidoActualizado;
}

  // Obtener pedidos por cliente
  static async getPedidosByCliente(idCliente) {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      productos:pedidos_productos(
        cantidad,
        producto:productos(
          n_producto,
          descripcion
        )
      )
    `)  // ← Usa template literals (`) y asegura formato limpio
    .eq('id_cliente', idCliente);

  if (error) {
    console.error('Error en Supabase:', error);
    throw new Error('Error al cargar pedidos');
  }

  return data;
}
// Obtener pedidos por estatus
static async getPedidosByEstatus(idEstatus) {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      cliente:usuarios!id_cliente(nombre_completo),
      estatus:estatus_p!id_estatusp(n_estatusp),
      prioridad:prioridad!id_prioridad(n_prioridad),
      estatus_pago:estatus_pago!id_estatuspago(n_estatuspago)
    `)
    .eq('id_estatusp', idEstatus)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error en Supabase:', error);
    throw new Error('Error al cargar pedidos por estatus');
  }

  return data;
}

// Obtener pedidos por prioridad
static async getPedidosByPrioridad(idPrioridad) {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      cliente:usuarios!id_cliente(nombre_completo),
      estatus:estatus_p!id_estatusp(n_estatusp),
      prioridad:prioridad!id_prioridad(n_prioridad),
      estatus_pago:estatus_pago!id_estatuspago(n_estatuspago)
    `)
    .eq('id_prioridad', idPrioridad)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error en Supabase:', error);
    throw new Error('Error al cargar pedidos por prioridad');
  }

  return data;
}
}

module.exports = PedidoService;