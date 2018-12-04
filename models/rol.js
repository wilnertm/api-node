'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    descripcion: DataTypes.STRING
  }, {});
  Rol.associate = function(models) {
    Rol.hasMany(models.Usuario, {
      foreignKey: 'id_rol',
      as: 'rol',
    });  
  };
  return Rol;
};