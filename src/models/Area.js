const supabase = require('../config/supabaseClient');

const Area = {
  tableName: 'area',

  // Estructura de la tabla
  schema: {
    id_area: { type: 'serial', primaryKey: true },
    n_area: { type: 'varchar', length: 100, notNull: true }
  }
};

module.exports = Area;