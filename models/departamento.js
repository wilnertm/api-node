'use strict';
module.exports = (sequelize, DataTypes) => {
  const Departamento = sequelize.define('Departamento', {
    nombre: DataTypes.STRING
  }, {});
  Departamento.associate = function(models) {
    // associations can be defined here
    Departamento.hasMany(models.Ciudad, {
      foreignKey: 'id_departamento',
      as: 'ciudades',
    });
  };
  return Departamento;
};