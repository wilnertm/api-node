'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombre: DataTypes.STRING,
    cn: DataTypes.STRING,
    activo: DataTypes.BOOLEAN,
    id_ciudad: DataTypes.INTEGER,
    nit: DataTypes.STRING,

  }, {});
  Cliente.associate = function(models) {
    // associations can be defined here
    Cliente.hasMany( models.Correo, {
      foreignKey: 'id_cliente',
      as: 'correosCliente'
    });
    Cliente.hasMany( models.Telefono, {
      foreignKey: 'id_cliente',
      as: 'telefonosCliente'
    });
    Cliente.hasMany( models.Actividade, {
      foreignKey: 'cliente_id',
      as: 'clienteCreo'
    });
    Cliente.belongsTo( models.Ciudad, {
      foreignKey: 'id_ciudad',
      as: 'ciudadCliente'
    });
  };
  return Cliente;
};