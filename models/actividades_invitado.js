'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actividades_invitado = sequelize.define('Actividades_invitado', {
    acepto: DataTypes.BOOLEAN
  }, {});
  Actividades_invitado.associate = function(models) {
    // associations can be defined here
  };
  return Actividades_invitado;
};