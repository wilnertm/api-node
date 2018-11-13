'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    id_ciudad: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
  }, {});
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.belongsTo(models.Ciudad, {
      foreignKey: 'id_ciudad',
      as: 'ciudades'
    });
    Usuario.hasMany(models.Actividade, {
      foreignKey: 'creado_por',
      as: 'creadoPor'
    });
    Usuario.hasMany(models.Actividade, {
      foreignKey: 'actualizado_por',
      as: 'actualizadoPor'
    });
    Usuario.hasMany(models.Actividades_invitado, {
      foreignKey: 'id_usuario',
      as: 'actividad_usuario'
    })
  };
  return Usuario;
};