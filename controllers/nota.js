const Nota = require('../models').Nota;
const Modulo = require('../models').Modulo;


module.exports = {
    list(req, res){
        return Nota
        .findAll({
            include: [{
                model: Modulo,
                as: 'referenciaModulo'
            }]
        })
        .then((notas) => res.status(200).send(notas))
        .catch((error) =>{
            res.status(400).send(error);
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
        return Nota
        .create({
            descripcion: req.body.descripcion,
            id_modulo: req.body.id_modulo,
            id_referencia: req.body.id_referencia
        })
        .then((notas) => res.status(200).send(notas))
        .catch((error) =>{
            res.status(400).send(error)
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