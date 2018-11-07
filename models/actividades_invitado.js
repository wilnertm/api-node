'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actividades_invitado = sequelize.define('Actividades_invitado', {
    acepto: DataTypes.BOOLEAN,
    id_usuario: DataTypes.INTEGER,
    id_actividad: DataTypes.INTEGER
  }, {});
  Actividades_invitado.associate = function(models) {
    // associations can be defined here
    Actividades_invitado.belongsTo(models.Actividade,{
      foreignKey: 'id_actividad',
      as: 'actividades'
    });
    Actividades_invitado.belongsTo(models.Usuario,{
      foreignKey: 'id_usuario',
      as: 'usuario'
    });
  };
  return Actividades_invitado;
};