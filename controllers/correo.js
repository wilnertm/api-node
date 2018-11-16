const Correo = require('../models').Correo;
const Cliente = require('../models').Cliente;

module.exports = {
    list(req, res){
        return Correo
        .findAll({
            include: [{
                model: Cliente,
                as: 'correosCliente'
            }]
        })
        .then( (correo) => res.status(200).send(correo))
        .catch ( (error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    getById( req , res){
        return Correo
        .findById(req.params.id, {
            include: [{
                model: Cliente,
                as: 'correosCliente'
            }]
        })
        .then( (correo) =>{
            if(!correo){
                return res.status(404).send({
                    message: 'Correo no encontrado'
                })
            }
            return res.status(200).send(correo)
        })
        .catch( (error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    add( req, res){
        return Correo
        .create({
            email: req.body.email,
            id_cliente: req.body.id_cliente
        })
        .then( (correo) => res.status(200).send(correo))
        .catch( (error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    update( req ,res){
        return Correo
        .findById(req.params.id, {
            include: [{
                model: Cliente,
                as: 'correosCliente'
            }]
        })
        .then ( (correo) =>{
            if(!correo){
                return res.status(404).send({
                    mesaage: 'Correro no encontrado'
                })
            }
            return correo
            .update({
                email: req.body.email,
            })
            .then( (correo) => res.status(200).send(correo))
            .catch( (error) =>{
                res.status(400).send(error)
            })
        })
        .catch( (error) =>{
            res.status(400).send(error)
        })
    },
    delete( req, res){
        return Correo
        .findById(req.params.id)
        .then( (correo) =>{
            if(!correo){
                return res.status(404).send({
                    message: 'Correo no encontrado'
                })
            }
            correo.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then( () => res.status(200).send())
            .catch( (error) =>{
                res.status(400).send(error)
            })        
        })
        .catch( (error) =>{
            res.status(400).send(error)
        })
    }
}