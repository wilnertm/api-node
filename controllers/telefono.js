const Telefono =  require('../models').Telefono;
const Cliente =  require('../models').Cliente;



module.exports = {
    list(req, res){
        return Telefono
        .findAll({
            include: [{
                model: Cliente,
                as: 'telefonosCliente'
            }],
            order: [
                ['createdAt', 'DESC'],
            ],
        })
        .then( (telefono) => res.status(200).send(telefono))
        .catch( (error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    getById(req, res){
        return Telefono
        .findById(req.params.id, {
            include: [{
                model: Cliente,
                as: 'telefonosCliente'
            }],
        })
        .then( (telefono) =>{
            if(!telefono){
                return res.status(404).send({
                    message: 'Telefono no encontrado'
                })
            }
            return res.status(200).send(telefono)
        })
        .catch( (error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    add(req, res){
        return Telefono
        .create({
            numero: req.body.numero,
            id_cliente: req.body.id_cliente
        })
        .then( (telefono) => res.status(200).send(telefono))
        .catch( (error) =>{
            res.status(400).send(error);
            console.log(error);
            
        })
    },
    update(req, res){
        return Telefono
        .findById(req.params.id, {
            include: [{
                model: Cliente,
                as: 'telefonosCliente'
            }]
        })
        .then( (telefono) =>{
            if(!telefono){
                return res.status(404).send({
                    message: 'telefono no encontrado'
                })
            } 
            return telefono
            .update({
                numero: req.body.numero,
            })
            .then((telefono) => res.status(200).send(telefono))
            .catch( (error) =>{
                res.status(400).send(error);
                console.log(error);
                
            })
        })
        .catch( (error) =>{
            res.status(400).send(error)
            console.log(error);
            
        })
    },
    delete( req, res){
        return Telefono
        .findById(req.params.id)
        .then ( (telefono) =>{
            if(!telefono){
                return res.status(404).send({
                    message: 'Telefono no encontrado'
                })
            }
            Telefono.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then (() => res.status(200).send())
            .catch( (error) =>{
                res.status(400).send(error);
            })
        })
        .catch( (error) =>{
            res.status(400).send(error);
        })
    }
    
}