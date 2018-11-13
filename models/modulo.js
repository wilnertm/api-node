'use strict';
module.exports = (sequelize, DataTypes) => {
  const Modulo = sequelize.define('Modulo', {
    descripcion: DataTypes.STRING,
    identificador: DataTypes.INTEGER
  }, {});
  Modulo.associate = function(models) {
    // associations can be defined here
    Modulo.hasMany(models.Nota, {
      foreignKey: 'id_referencia',
      as: 'referenciaModulo',
    });
    Modulo.hasMany(models.Opcione, {
      foreignKey: 'modulo',
      as: 'referenciaOpciones',
    })
  };
  return Modulo;
};