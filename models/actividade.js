'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actividade = sequelize.define('Actividade', {
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    asunto: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    tipo_actividad: DataTypes.INTEGER,
    tipo: DataTypes.INTEGER,
    estado_actividad: DataTypes.INTEGER,
    creado_por: DataTypes.INTEGER,
    actualizado_por: DataTypes.INTEGER,
    prioridad: DataTypes.INTEGER
  }, {});
  Actividade.associate = function(models) {
    // associations can be defined here
    Actividade.belongsTo(models.Opcione,{
      foreignKey: 'tipo_actividad',
      as: 'opciones'
    });
    Actividade.belongsTo(models.Opcione,{
      foreignKey: 'tipo',
      as: 'tipoEvento'
    });
    Actividade.belongsTo(models.Opcione,{
      foreignKey: 'prioridad',
      as: 'opcionPrioridad'
    });
    Actividade.belongsTo(models.Usuario,{
      foreignKey: 'creado_por',
      as: 'creadoPor'
    });
    Actividade.belongsTo(models.Usuario,{
      foreignKey: 'actualizado_por',
      as: 'actualizadoPor'
    });
    Actividade.hasMany(models.Actividades_invitado,{
      foreignKey: 'id_actividad',
      as: 'actividadesInvitado'
    })
  };
  return Actividade;
};