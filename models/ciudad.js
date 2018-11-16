'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ciudad = sequelize.define('Ciudad', {
    nombre: DataTypes.STRING,
    id_departamento: DataTypes.INTEGER
  }, {});
  Ciudad.associate = function(models) {
    // associations can be defined here
    Ciudad.belongsTo(models.Departamento, {
      foreignKey: 'id_departamento',
      as: 'departamentos'
    });
    Ciudad.hasMany(models.Usuario, {
      foreignKey: 'id_ciudad',
      as: 'usuarios',
    });
    Ciudad.hasMany(models.Cliente, {
      foreignKey: 'id_ciudad',
      as: 'ciudadCliente',
    });

  };
  return Ciudad;
};