const Actividade = require('../models').Actividade
const Usuario = require('../models').Usuario
const Actividades_invitado = require('../models').Actividades_invitado
const Opcione = require('../models').Opcione;
const Cliente = require('../models').Cliente;

module.exports = {
    list(req, res){
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
            },{
                model: Actividades_invitado,
                as: 'actividadesInvitado'
            },
            {
                model: Opcione,
                as: 'opciones'
            },{
                model: Opcione,
                as: 'opcionPrioridad'
            },{
                model: Opcione,
                as: 'tipoEvento'
            },{
                model: Cliente,
                as: 'clienteCreo'
            }
            ],
                order:[
                    ['createdAt', 'DESC'],
                ],
        })
        .then((actividades) => res.status(200).send(actividades))
        .catch ((error) =>{
            console.log(error);
            res.status(400).send(error);
        });
    },
    getById(req, res){
        return Actividade
        .findById(req.params.id, {
            include:[{
                model: Usuario,
                as: 'creadoPor'
            },{
                model: Actividades_invitado,
                as: 'actividadesInvitado'
            },            {
                model: Opcione,
                as: 'opciones'
            },{
                model: Opcione,
                as: 'opcionPrioridad'
            },{
                model: Opcione,
                as: 'tipoEvento'
            },{
                model: Opcione,
                as: 'estado'
            },{
                model: Cliente,
                as: 'clienteCreo'
            }]
        })
        .then((actividades) =>{
            if(!actividades){
                return res.status(404).send({
                    message: 'Actividad no encontrada',
                });
            }
            return res.status(200).send(actividades);
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).send(error)
        })
    },
    add(req, res){
        return Actividade
        .create({
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            asunto: req.body.asunto,
            tipo_actividad: req.body.tipo_actividad,
            tipo: req.body.tipo,
            estado_actividad: req.body.estado_actividad,
            creado_por: req.body.creado_por,
            actualizado_por: req.body.actualizado_por,
            prioridad: req.body.prioridad,
            cliente_id: req.body.idCliente,
            activo: true
        })
        .then((actividades) =>{
            res.status(201).send(actividades)
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).send(error);
            
        })
    },
    update(req, res){
        return Actividade
        .findById(req.params.id)
        .then((actividades) =>{
            if(!actividades){
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
            })
            .then((actividades) => res.status(200).send(actividades))
            .catch((error) =>{
                console.log(error);
                res.status(400).send(error);
            });
        })
        .catch((error) =>{
            console.log(error);
            res.status(404).send(error)
        });
    },
    delete( req, res){
        return Actividade
        .findById(req.params.id)
        .then( actividades =>{
            if(!actividades){
                return res.status(404).send({
                    message: 'Actividad no encontrada'
                });
            }
            Actividade.destroy({
                where:{
                    id:req.params.id
                }
            })
            .then(() => res.status(204).send())
            .catch((error) =>{
                console.log(error);
                res.status(400).send(error)
            });
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).send(error)
        })
    }
};