const Producto = require('../models/Producto');

const ProductoService = {
  async getAll() {
    try {
      return await Producto.getAll();
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  },

  async getById(id) {
    try {
      const producto = await Producto.getById(id);
      if (!producto) throw new Error('Producto no encontrado');
      return producto;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  },

  async create(productoData) {
    try {
      if (!Producto.validateProductName(productoData.n_producto)) {
        throw new Error('El nombre del producto debe tener entre 3 y 100 caracteres');
      }
      
      // Validar precio si se proporciona
      if (productoData.precio !== undefined && !Producto.validatePrice(productoData.precio)) {
        throw new Error('El precio debe ser un número válido mayor o igual a 0');
      }

      return await Producto.create(productoData);
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  },

  async update(id, productoData) {
    try {
      if (productoData.n_producto && !Producto.validateProductName(productoData.n_producto)) {
        throw new Error('El nombre del producto debe tener entre 3 y 100 caracteres');
      }

      // Validar precio si se está actualizando
      if (productoData.precio !== undefined && !Producto.validatePrice(productoData.precio)) {
        throw new Error('El precio debe ser un número válido mayor o igual a 0');
      }

      const updated = await Producto.update(id, productoData);
      if (!updated) throw new Error('Producto no encontrado');
      return updated;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  },

  async delete(id) {
    try {
      const deleted = await Producto.delete(id);
      if (!deleted) throw new Error('Producto no encontrado');
      return deleted;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  },

  async searchByName(name) {
    try {
      if (!name || name.length < 3) {
        throw new Error('El término de búsqueda debe tener al menos 3 caracteres');
      }
      return await Producto.searchByName(name);
    } catch (error) {
      throw new Error(`Error en búsqueda: ${error.message}`);
    }
  },

  // Nuevo método para búsqueda por rango de precios
  async searchByPriceRange(minPrice, maxPrice) {
    try {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      
      if (isNaN(min) || isNaN(max) || min < 0 || max < 0 || min > max) {
        throw new Error('Los precios deben ser números válidos y el precio mínimo no puede ser mayor al máximo');
      }
      
      return await Producto.searchByPriceRange(min, max);
    } catch (error) {
      throw new Error(`Error en búsqueda por precio: ${error.message}`);
    }
  }
};

module.exports = ProductoService;