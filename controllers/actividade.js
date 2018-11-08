const Actividade = require('../models').Actividade
const Usuario = require('../models').Usuario
const Actividades_invitado = require('../models').Actividades_invitado

module.exports = {
    list(req, res){
        return Actividade
        .findAll({

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
            }],
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
            estado_actividad: req.body.estado_actividad,
            creado_por: req.body.creado_por,
            actualizado_por: req.body.actualizado_por,
            prioridad: req.body.prioridad
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
        .findById(req.params.id, {
            include: [{
                model: Usuario,
                as: 'actualizadoPor'
            },{
                model: Actividades_invitado,
                as: 'actividadesInvitado'
            }]
        })
        .then((actividades) =>{
            if(!actividades){
                return res.status(404).send({
                    message: 'Actividad no encontrada'
                });
            }
            return actividades
            .update({
                fecha_inicio: req.body.fecha_inicio || actividades.fecha_inicio,
                fecha_fin: req.body.fecha_fin || actividades.fecha_fin,
                asunto: req.body.asunto || actividades.asunto
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