const supabase = require('../config/supabaseClient');

const Funcion = {
  tableName: 'funcion',

  // Estructura de la tabla
  schema: {
    id_funcion: { type: 'serial', primaryKey: true },
    n_funcion: { type: 'varchar', length: 100, notNull: true }
  }
};

module.exports = Funcion;