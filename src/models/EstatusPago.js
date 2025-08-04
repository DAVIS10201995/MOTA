

const EstatusPago = {
  tableName: 'estatus_pago',

  schema: {
    id_estatuspago: { type: 'serial', primaryKey: true },
    n_estatuspago: { type: 'varchar', length: 50, notNull: true }
  }
};

module.exports = EstatusPago;