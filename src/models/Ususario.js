const supabase = require('../config/SupabaseClient');
const Usuario = {
  tableName: 'usuarios',

  schema: {
    id_usuario: { type: 'serial', primaryKey: true },
    nombre_completo: { type: 'varchar', length: 200, notNull: true },
    id_area: { type: 'integer', references: 'area(id_area)' },
    id_funcion: { type: 'integer', references: 'funcion(id_funcion)' },
    telefono: { type: 'varchar', length: 20 },
    telefono_consultorio: { type: 'varchar', length: 20 },
    contrasena: { type: 'varchar', length: 100, notNull: true }
  }
};

module.exports = Usuario;