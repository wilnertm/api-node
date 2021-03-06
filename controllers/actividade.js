const Actividade = require('../models').Actividade
const Usuario = require('../models').Usuario
const Actividades_invitado = require('../models').Actividades_invitado
const Opcione = require('../models').Opcione;
const Cliente = require('../models').Cliente;
const db = require('../models/index')

module.exports = {
    list(req, res) {
        return Actividade
            .findAll({
                where: {
                    activo: true
                },
                attributes: [
                    'id',
                    ['fecha_inicio', "start"],
                    ['fecha_fin', "end"],
                    ['asunto', "title"]
                ],
                include: [{
                    model: Usuario,
                    as: 'creadoPor'
                }, {
                    model: Actividades_invitado,
                    as: 'actividadesInvitado'
                },
                {
                    model: Opcione,
                    as: 'opciones'
                }, {
                    model: Opcione,
                    as: 'opcionPrioridad'
                }, {
                    model: Opcione,
                    as: 'tipoEvento'
                }, {
                    model: Cliente,
                    as: 'clienteCreo'
                }
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((actividades) => res.status(200).send(actividades))
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    getById(req, res) {
        return Actividade
            .findById(req.params.id, {
                include: [{
                    model: Usuario,
                    as: 'creadoPor'
                }, {
                    model: Actividades_invitado,
                    as: 'actividadesInvitado'
                }, {
                    model: Opcione,
                    as: 'opciones'
                }, {
                    model: Opcione,
                    as: 'opcionPrioridad'
                }, {
                    model: Opcione,
                    as: 'tipoEvento'
                }, {
                    model: Opcione,
                    as: 'estado'
                }, {
                    model: Cliente,
                    as: 'clienteCreo'
                }]
            })
            .then((actividades) => {
                if (!actividades) {
                    return res.status(404).send({
                        message: 'Actividad no encontrada',
                    });
                }
                return res.status(200).send(actividades);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            })
    },
    add(req, res) {
        Actividade.create({
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            asunto: req.body.asunto,
            descripcion: req.body.descripcion,
            tipo_actividad: req.body.tipo_actividad,
            tipo: req.body.tipo,
            estado_actividad: req.body.estado_actividad,
            creado_por: req.body.creadoPor,
            actualizado_por: req.body.actualizado_por,
            prioridad: req.body.prioridad,
            cliente_id: req.body.idCliente,
            activo: true
        })
            .then((actividades) => {
                Actividades_invitado.create({
                    include: [{
                        model: Actividades_invitado,
                        as: 'actividadesInvitado',
                    }],
                    acepto: true,
                    id_usuario: actividades.creado_por,
                    id_actividad: actividades.id,
                });
                let invitados = req.body.usuario
                if (Array.isArray(invitados)) {
                    for (let index = 0; index < invitados.length; index++) {
                        Actividades_invitado.create({
                            include: [{
                                model: Actividades_invitado,
                                as: 'actividadesInvitado',
                            }],
                            acepto: false,
                            id_usuario: invitados[index].id,
                            id_actividad: actividades.id,
                        })
                    }
                }
                res.status(200).send(actividades)
                return;
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            })
    },
    update(req, res) {
        return Actividade
            .findById(req.params.id)
            .then((actividades) => {
                if (!actividades) {
                    return res.status(404).send({
                        message: 'Actividad no encontrada'
                    });
                }
                return actividades
                    .update({
                        fecha_inicio: req.body.fechaInicio,
                        fecha_fin: req.body.fechaFin,
                        asunto: req.body.asunto,
                        cliente_id: req.body.idCliente,
                        actualizado_por: req.body.actualizadoPor
                    })
                    .then((actividades) => res.status(200).send(actividades))
                    .catch((error) => {
                        console.log(error);
                        res.status(400).send(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(404).send(error)
            });
    },
    delete(req, res) {
        return Actividade
            .findById(req.params.id)
            .then(actividades => {
                if (!actividades) {
                    return res.status(404).send({
                        message: 'Actividad no encontrada'
                    });
                }
                Actividade.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => res.status(204).send())
                    .catch((error) => {
                        console.log(error);
                        res.status(400).send(error)
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            })
    },
    createUser(req, res) {
        return Actividade
            .findAll({
                where: {
                    activo: true,
                    creado_por: req.body.creadoPor,
                },
                attributes: [
                    'id',
                    ['fecha_inicio', "start"],
                    ['fecha_fin', "end"],
                    ['asunto', "title"]
                ],
                include: [{
                    model: Usuario,
                    as: 'creadoPor'
                }, {
                    model: Actividades_invitado,
                    as: 'actividadesInvitado'
                },
                {
                    model: Opcione,
                    as: 'opciones'
                }, {
                    model: Opcione,
                    as: 'opcionPrioridad'
                }, {
                    model: Opcione,
                    as: 'tipoEvento'
                }, {
                    model: Cliente,
                    as: 'clienteCreo'
                }
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((results) => {
                db.sequelize.query(`SELECT "Actividades".id, "Actividades".fecha_inicio as start, "Actividades".fecha_fin as end,"Actividades".asunto as title FROM "Actividades" INNER JOIN "Actividades_invitados" ON "Actividades".id="Actividades_invitados".id_actividad 
                WHERE "Actividades_invitados".id_usuario = ${req.body.creadoPor} AND "Actividades_invitados".acepto = true; `)
                    .spread((actividades, metadata) => {
                        // Results will be an empty array and metadata will contain the number of affected rows.
                        res.status(200).send(actividades)
                    })
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    conteo(req, res) {
        return Actividade
            .findOne({
                where: {
                    creado_por: req.body.creadoPor,
                }
            })
            .then((actividades) => {
                db.sequelize.query(`SELECT COUNT (id) FROM "Actividades_invitados" WHERE id_usuario =${req.body.creadoPor} AND acepto= false LIMIT 1;`)
                    .spread((conteo, metadata) => {
                        // Results will be an empty array and metadata will contain the number of affected rows.
                        res.status(200).send(conteo)
                    })
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    actividadesUser(req, res) {
        return Actividade
            .findOne({
                where: {
                    creado_por: req.body.creadoPor,
                }
            })
            .then((actividades) => {
                db.sequelize.query(`SELECT * FROM "Actividades" INNER JOIN "Actividades_invitados" ON "Actividades".id="Actividades_invitados".id_actividad 
                WHERE "Actividades_invitados".id_usuario =  ${req.body.creadoPor} AND "Actividades_invitados".acepto = false;`)
                    .spread((results, metadata) => {
                        // Results will be an empty array and metadata will contain the number of affected rows.
                        res.status(200).send(results)
                    })
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    }
};