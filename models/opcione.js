'use strict';
module.exports = (sequelize, DataTypes) => {
  const Opcione = sequelize.define('Opcione', {
    descripcion: DataTypes.STRING,
    modulo: DataTypes.INTEGER,
    categoria: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN
  }, {});
  Opcione.associate = function(models) {
    // associations can be defined here
    Opcione.hasMany(models.Actividade, {
      foreignKey: 'tipo_actividad',
      as: 'actividades'
    });
    Opcione.hasMany(models.Actividade, {
      foreignKey: 'tipo',
      as: 'tipoEvento'
    });
    Opcione.hasMany(models.Actividade, {
      foreignKey: 'prioridad',
      as: 'opcionPrioridad'
    });
    Opcione.belongsTo(models.Modulo, {
      foreignKey: 'modulo',
      as: 'referenciaOpciones'
    });
  };
  return Opcione;
};