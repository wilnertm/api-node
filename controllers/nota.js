const Nota = require('../models').Nota;
const Modulo = require('../models').Modulo;


module.exports = {
    list(req, res){
        return Modulo
        .findOne({
            where:{
                descripcion: req.body.id_referencia,
            }
        })
        .then(modulo =>{
            return Nota
            .findAll({
                where:{
                    id_referencia: modulo.id,
                    actividad: req.body.actividad,
                    activo: true
                },
                include: [{
                    model: Modulo,
                    as: 'referenciaModulo'
                }]
            })
            .then((notas) => res.status(200).send(notas))
            .catch((error) =>{
                res.status(400).send(error)
            })
            
        })
        .catch((error) => {
            res.status(400).send(error)
            console.log(error);
        })
    },
    getById(req, res){
        return Nota
        .findById(req.params.id, {
            include: [{
                model: Modulo,
                as: 'referenciaModulo'
            }]
        })
        .then((notas) =>{
            if(!notas){
                return res.status(404).send({
                    message: 'Nota no encontrada'
                })
            }
            return res.status(200).send(notas)
        })
        .catch((error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    add(req, res){
        return Modulo
        .findOne({
            where:{
                descripcion: req.body.id_referencia,
            }
        })
        .then(modulo =>{
            return Nota
            .create({
                descripcion: req.body.descripcion,
                actividad: req.body.actividad,
                id_referencia: modulo.id,
                activo: true
            })
            .then((notas) => res.status(200).send(notas))
            .catch((error) =>{
                res.status(400).send(error)
            })
            
        })
        .catch((error) => {
            res.status(400).send(error)
            console.log(error);
        })
    },
    update(req, res){
        return Nota
        .findById(req.params.id, {
            include: [{
                model: Modulo,
                as: 'referenciaModulo'
            }]
        })
        .then((notas) =>{
            if(!notas){
                return res.status(404).send({
                    message: 'Nota no encontrada'
                })
            }
            return notas
            .update({
                descripcion: req.body.descripcion
            })
            .then((notas) => res.status(200).send(notas))
            .catch((error) =>{
                res.status(400).send(error);
                console.log(error);
                
            })
        })
        .catch((error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    delete(req, res){
        return Nota
        .findById(req.params.id)
        .then((notas) =>{
            if(!notas){
                return res.status(404).send({
                    message: 'Nota no encontrada'
                })
            }
            Nota.destroy({
                where:{
                    id:req.params.id
                }
            })
            .then(() => res.status(200).send())
            .catch((error) =>{
                res.status(400).send(error);
                console.log(error);
                
            })
        })
        .catch((error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    }
}