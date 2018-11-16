'use strict';
module.exports = (sequelize, DataTypes) => {
  const Telefono = sequelize.define('Telefono', {
    numero: DataTypes.STRING,
    id_cliente: DataTypes.INTEGER
  }, {});
  Telefono.associate = function(models) {
    // associations can be defined here
    Telefono.belongsTo( models.Cliente, {
      foreignKey: 'id_cliente',
      as: 'telefonosCliente'
    })
  };
  return Telefono;
};