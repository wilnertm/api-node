const Ciudad = require('../models').Ciudad;
const Departamento = require('../models').Departamento
const Usuario = require('../models').Usuario

module.exports = {
    list(req, res){
        return Ciudad
            .findAll({
                include: [{
                    model: Usuario,
                    as: 'usuarios'
                },{
                    model: Departamento,
                    as: 'departamentos'
                }],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((ciudads) => res.status(200).send(ciudads))
            .catch((error) =>{ 
                console.log(error)
                res.status(400).send(error) 
            });
    },
    getById(req, res){
        return Ciudad
            .findById(req.params.id, {
                include: [{
                    model: Usuario,
                    as: 'usuarios'
                },{
                    model: Departamento,
                    as: 'departamentos'
                }],
            })
            .then((ciudad) =>{
                if(!ciudad){
                    return res.status(404).send({
                        message: 'Ciudad no encontrada',
                    });
                }
                return res.status(200).send(ciudad);
            })
            .catch((error) => res.status(400).send(error));
    },
    add(req, res){
        return Ciudad
            .create({
                id_departamento: req.body.id_departamento,
                nombre: req.body.nombre,
            })
            .then((ciudad) => res.status(201).send(ciudad))
            .catch((error) => res.status(400).send(error));
    },
    update(req, res){
        return Ciudad
            .findById(req.params.id, {
                include: [{
                    model: Usuario,
                    as: 'usuarios'
                },{
                    model: Departamento,
                    as: 'departamentos'
                }],
            })
            .then((ciudad) =>{
                if(!ciudad){
                    return res.status(404).send({
                        message: 'Ciudad no encontrada'
                    });
                }
                return ciudad
                    .update({
                        nombre: req.body.nombre
                    })
                    .then((ciudad) => res.status(200).send(ciudad))
                    .catch((error) =>{
                        console.log(error)
                        res.status(400).send(error)});
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)});
    },
    delete(req, res){
        return Ciudad
            .findById(req.params.id)
            .then(ciudad => {
                if(!ciudad){
                    return res.status(404).send({
                        message: 'Ciudad no encontrada'
                    });
                }
                    Ciudad.destroy({
                        where:{id:req.params.id}
                    })
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

};