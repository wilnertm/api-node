const Actividade = require('../models').Actividade
const Usuario = require('../models').Usuario

module.exports = {
    list(req, res){
        return Actividade
        .findAll({
            include: [{
                model: Usuario,
                as: 'usuarios'
            },{
                model: Actividades_invitado,
                as: 'ActividadesInvitados'
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
                as: 'usuarios'
            },{
                model: Actividades_invitado,
                as: 'ActividadesInvitados'
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
            tipo_actividad: req.body.tipo_actividad,
            estado_actividad: req.body.estado_actividad,
            creador_por: req.body.creador_por,
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
                as: 'usuarios'
            },{
                model: Actividades_invitado,
                as: 'ActividadesInvitado'
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
                fecha_fin: req.body.fecha_fin || actividades.fecha_fin
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