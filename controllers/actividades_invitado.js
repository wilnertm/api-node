const Actividades_invitado = require ('../models').Actividades_invitado;
const Actividade = require ('../models').Actividade;
const Usuario = require ('../models').Usuario;

module.exports = {
    list(req,res){
        return Actividades_invitado
        .findAll({
            include: [{
                model: Usuario,
                as: 'usuario'
            },{
                model: Actividade,
                as: 'actividades'
            }],
            order: [
                ['createdAt', 'DESC']
            ],
        })
        .then((actividades_invitados) => res.status(200).send(actividades_invitados))
        .catch((error) => {
            console.log(error);
            res.status(400).send(error)
        });
    },
    getById(req, res){
        return Actividades_invitado
        .findById(req.params.id, {
            include: [{
                model: Usuario,
                as: 'usuario'
            },{
                model: Actividade,
                as: 'actividades'
            }]
        })
        .then((actividades_invitados) =>{
            if(!actividades_invitados){
                return res.status(404).send({
                    message: 'Actividad_invitado no encontrada'
                });
            }
            return res.status(200).send(actividades_invitados);
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).send(error)
        })
    },
    add(req, res){
        return Actividades_invitado
        .create({
            id_usuario: req.body.id_usuario,
            id_actividad: req.body.id_actividad,
            acepto: req.body.acepto
        })
        .then((actividades_invitados) =>{ res.status(200).send(actividades_invitados)})
        .catch((error) =>{
            console.log(error);
            res.status(400).send(error)
        })
    },
    update(req, res){
        return Actividades_invitado
        .findById(req.params.id, {
            include: [{
                model: Usuario,
                as: 'usuario'
            },{
                model: Actividade,
                as: 'actividades'
            }],
        })
        .then( actividades_invitados =>{
            if(!actividades_invitados){
                return res.status(404).send({
                    message: 'ActividadInvitado no encontrada'
                });
            }
            return actividades_invitados
            .update({
                acepto: req.body.acepto
            })
            .then(actividades_invitados => res.status(200).send(actividades_invitados))
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
        return Actividades_invitado
        .findById(req.params.id)
        .then( actividades_invitados =>{
            if(!actividades_invitados){
                return res.status(400).send({
                    message: 'ActividadInvitado no encontrada'
                })
            }
            Actividades_invitado.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).send())
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

}