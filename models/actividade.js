'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actividade = sequelize.define('Actividade', {
    fecha_inicio: DataTypes.DATE
  }, {});
  Actividade.associate = function(models) {
    Actividade.hasMany(models.Opcione, {
      foreignKey: 'tipo_actividad',
      as: 'opciones',
    });
  };
  return Actividade;
};