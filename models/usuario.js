'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    id_ciudad: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.belongsTo(models.Ciudad, {
      foreignKey: 'id_ciudad',
      as: 'ciudades'
    });
  };
  return Usuario;
};