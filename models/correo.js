'use strict';
module.exports = (sequelize, DataTypes) => {
  const Correo = sequelize.define('Correo', {
    email: DataTypes.STRING,
    id_cliente: DataTypes.INTEGER
  }, {});
  Correo.associate = function(models) {
    // associations can be defined here
    Correo.belongsTo( models.Cliente, {
      foreignKey: 'id_cliente',
      as: 'correosCliente'
    })
  };
  return Correo;
};