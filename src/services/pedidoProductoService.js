const PedidoProducto = require('../models/PedidosProductos');

class PedidoProductoService {
  // Agregar múltiples productos a un pedido
  static async addProducts(pedidoId, productos) {
    if (!Array.isArray(productos)) {
      throw new Error('El parámetro debe ser un array');
    }

    // Validar que los productos existen y preparar los datos
    const productosData = await Promise.all(
      productos.map(async (p) => {
        // Verificar que el producto existe y obtener su precio actual
        const precioActual = await PedidoProducto.getProductPrice(p.id_producto);
        
        return {
          id_pedido: pedidoId,
          id_producto: p.id_producto,
          cantidad: p.cantidad,
          // NO enviamos precio_unitario - el trigger lo asignará automáticamente
        };
      })
    );

    return await PedidoProducto.addProductsToOrder(productosData);
  }

  // Actualizar un producto en el pedido
  static async updateProduct(pedidoId, productoId, updates) {
    // Validar que no se intente actualizar el precio_unitario manualmente
    if (updates.precio_unitario !== undefined) {
      throw new Error('El precio_unitario no se puede modificar manualmente. Se toma automáticamente del producto.');
    }

    // Si se actualiza el producto, verificar que existe
    if (updates.id_producto) {
      await PedidoProducto.getProductPrice(updates.id_producto);
    }

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