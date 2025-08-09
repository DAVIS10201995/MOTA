const PedidoProducto = require('../models/PedidosProductos');

class PedidoProductoService {
  // Agregar múltiples productos a un pedido
  static async addProducts(pedidoId, productos) {  // Cambiar parámetro body → productos
  if (!Array.isArray(productos)) {
    throw new Error('El parámetro debe ser un array');
  }

  const productosData = productos.map(p => ({
    id_pedido: pedidoId,
    id_producto: p.id_producto,
    cantidad: p.cantidad,
    precio_unitario: p.precio_unitario
  }));

  return await PedidoProducto.addProductsToOrder(productosData);
}

  // Actualizar un producto en el pedido
  static async updateProduct(pedidoId, productoId, updates) {
    return await PedidoProducto.updateProductInOrder(
      pedidoId,
      productoId,
      updates
    );
  }

  // Eliminar un producto del pedido
  static async removeProduct(pedidoId, productoId) {
    return await PedidoProducto.removeProductFromOrder(pedidoId, productoId);
  }

  // Obtener productos de un pedido con detalles
  static async getProductsWithDetails(pedidoId) {
    return await PedidoProducto.getOrderProductsWithDetails(pedidoId);
  }
}

module.exports = PedidoProductoService;