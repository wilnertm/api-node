'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombre: DataTypes.STRING,
    password: DataTypes.STRING,
    activo: DataTypes.BOOLEAN,
    id_ciudad: DataTypes.INTEGER
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
      foreignKey: 'cliente_creo',
      as: 'clienteCreo'
    });
    Cliente.belongsTo( models.Ciudad, {
      foreignKey: 'id_ciudad',
      as: 'ciudadCliente'
    });
  };
  return Cliente;
};