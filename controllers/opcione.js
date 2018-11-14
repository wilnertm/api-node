const Opcione = require('../models').Opcione;
const Actividade = require('../models').Actividade

module.exports = {
    list(req, res){
        return Opcione
        .findAll({
            where:{
                activo: true
            },
            include: [{
                model: Actividade,
                as: 'opciones'
            },
            {
                model: Actividade,
                as: 'tipoEvento'
            },{
                model: Actividade,
                as: 'opcionPrioridad'
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then((opciones) => res.status(200).send(opciones))
        .catch((error) =>{
            console.log(error);
            res.status(400).send(error)
        })
    },
    getById(req,res){
        return Opcione
        .findById(req.params.id, {
            include: [{
                model: Actividade,
                as: 'actividades'
            }],
        })
        .then((opciones) =>{
            if(!opciones){
                return res.status(400).send({
                    message: 'Opcion no enconetrada'
                });
            }
            return res.status(200).send(opciones);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(error)
        })
    },
    add(req, res){
        return Opcione
        .create({
            descripcion: req.body.descripcion,
            modulo: req.body.modulo,
            categoria: req.body.categoria
        })
        .then(opciones => res.status(200).send(opciones))
        .catch((error) =>{
            console.log(error);
            res.status(400).send(error)
        });
    },
    update(req,res){
        return Opcione
        .findById(req.params.id, {
            include: [{
                model: Actividade,
                as: 'actividades'
            }],
        })
        .then((opciones) =>{
            if(!opciones){
                return res.status(404).send({
                    message: 'Opcion no encontrada'
                });
            }
            return opciones
            .update({
                categoria: req.body.categoria 
            })
            .then( opciones => res.status(200).send(opciones))
            .catch((error) =>{
                console.log(error);
                res.status(400).send(error)
            });
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).send(error)
        })
    },
    delete(req, res){
        return Opcione
        .findById(req.params.id)
        .then(opciones =>{
            if(!opciones){
                return res.status(404).send({
                    message: 'Opción no encontrada'
                });
            }
            opciones.destroy({
                where:{
                    id:req.params.is
                }
            })
            .then(() => res.status(200).send())
            .catch((error) => {
                console.log(erorr);
                res.status(400).send(error)
            });
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).send(error)
        })
    }
}