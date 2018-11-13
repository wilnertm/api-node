const Modulo = require('../models').Modulo
const Nota = require('../models').Nota

module.exports = {
    list(req, res){
        return Modulo
        .findAll({
            include: [{
                model: Nota,
                as: 'referenciaModulo'
            }]
        })
        .then((modulos) => res.status(200).send(modulos))
        .catch((error) =>{
            res.status(400).send(error)
            console.log(error);
            
        })
    },
    getById(req, res){
        return Modulo
        .findById(req.params.id,{
            include: [{
                model: Nota,
                as: 'referenciaModulo'
            }]
        })
        .then((modulos) =>{
            if(!modulos){
                return res.status(404).send({
                    message: 'modulo no encontrado'
                })
            }
            return res.status(200).send(modulos);
        })
        .catch((error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    add(req, res){
        return Modulo
        .create({
            descripcion: req.body.descripcion
        })
        .then((modulos) => res.status(201).send(modulos))
        .catch((error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    update(req, res){
        return Modulo
        .findById(req.params.id,{
            include: [{
                model: Nota,
                as: 'referenciaModulo'
            }]
        })
        .then((modulos) =>{
            if(!modulos){
                return res.status(404).send({
                    message: 'Modulo no encontrado'
                })
            }
            return modulos
            .update({
                descripcion: req.body.descripcion
            })
            .then((modulos) => res.status(200).send(modulos))
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
        return Modulo
        .findById(req.params.id)
        .then((modulos) =>{
            if(!modulos){
                return res.status(404).send({
                    message: 'Modulo no encontrado'
                })
            }
            Modulo.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(()=> res.status(204).send())
            .catch((error) =>{
                res.status(400).send(error);
                console.log(error);
                
            })
        })
        .catch((error) =>{
            res.status(400).send(error)
            console.log(error);
            
        })
    }
}