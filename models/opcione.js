'use strict';
module.exports = (sequelize, DataTypes) => {
  const Opcione = sequelize.define('Opcione', {
    descripcion: DataTypes.STRING
  }, {});
  Opcione.associate = function(models) {
    // associations can be defined here
  };
  return Opcione;
};