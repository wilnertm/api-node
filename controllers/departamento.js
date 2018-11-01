const Departamento = require('../models').Departamento;
const Ciudad = require('../models').Ciudad;

module.exports = {
    list(req, res){
        return Departamento
            .findAll({
                include: [{
                    model: Ciudad,
                    as: 'ciudades'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Ciudad, as: 'ciudades'}, 'createdAt', 'DESC'],
                ],
            })
            .then((departamentos) => res.status(200).send(departamentos))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res){
        return Departamento
            .findById(req.params.id, {
                include: [{
                    model: Ciudad,
                    as: 'ciudades'
                }],
            })
            .then((departamento) =>{
                if (!departamento){
                    return res.status(404).send({
                        message: 'Departamento No Encontrado',
                    });
                }
                return res.status(200).send(departamento)
            })
            .catch((error) => res.status(400).send(error));
    },
    add(req, res){
        return Departamento
            .create({
                nombre: req.body.nombre,
                // id_departamento: req.body.id_departamento,
            })
            .then((departamento) => res.status(201).send(departamento))
            .catch((error) => res.status(400).send(error));
    },
    update(req, res){
        return Departamento
            .findById(req.params.id, {
                include: [{
                    model: Ciudad,
                    as: 'ciudades'
                }],
            })
            .then((departamento) =>{
                if (!departamento){
                    return res.status(404).send({
                        message: 'Departamento No Encontrado',
                    });
                }
                return departamento
                    .update({
                        nombre: req.body.nombre || departamento.nombre,
                    })
                    .then(() => res.status(200).send(departamento))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(200).send(error));
    },
    delete(req, res){
        return Departamento
            .findById(req.params.id)
            .then(departamento =>{
                if(!departamento){
                    return res.status(404).send({
                        message: 'Departamento no encontrado'
                    });
                }
                Departamento.destroy({
                    where:{id:req.params.id}
                })
                .then(() => res.status(204).send('Borrado Exitoso'))
                .catch((error) =>{
                        console.log(error)
                        res.status(400).send(error)
                });
                    
            })
            .catch((error) =>{ console.log(error)
                res.status(400).send(error)});
    },
};