
const Prioridad = {
    tableName: 'prioridad',
    schema: {
         id_prioridad: { type: 'serial', primaryKey: true },
         n_prioridad: { type: 'varchar', length: 50, notNull: true }
    
}
};
module.exports= Prioridad;