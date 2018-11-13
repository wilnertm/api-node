'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nota = sequelize.define('Nota', {
    descripcion: DataTypes.STRING,
    id_modulo: DataTypes.STRING,
    id_referencia: DataTypes.INTEGER
  }, {});
  Nota.associate = function(models) {
    // associations can be defined here
    Nota.belongsTo(models.Modulo, {
      foreignKey: 'id_referencia',
      as: 'referenciaModulo'
    })
  };
  return Nota;
};