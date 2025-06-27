// models/Usuario.js
const { DataTypes } = require('sequelize');
const db = require('../db');

const Usuario = db.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_completo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20)
  },
  telefono_consultorio: {
    type: DataTypes.STRING(20)
  },
  contrasena: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  id_area: {
    type: DataTypes.INTEGER,
    references: {
      model: 'area', // Esto hace referencia al nombre de la tabla en la BD
      key: 'id_area'
    }
  },
  id_funcion: {
    type: DataTypes.INTEGER,
    references: {
      model: 'funcion', // Esto hace referencia al nombre de la tabla en la BD
      key: 'id_funcion'
    }
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;