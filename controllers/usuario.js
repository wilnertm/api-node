const Usuario = require('../models').Usuario;
const Ciudad = require('../models').Ciudad;
const db = require('../models/index')
const Departamento = require('../models').Departamento

module.exports = {
    list(req, res){
        return Usuario
            .findAll({
                // db.sequelize.query("SELECT public.'Departamentos'.nombre,public.'Ciudads'.nombre,public.'Usuarios'.nombres FROM public.'Departamentos' INNER JOIN public.'Ciudads' ON public.'Ciudads'.id_departamento=public.'Departamentos'.id INNER JOIN public.'Usuarios' ON public.'Usuarios'.id_ciudad=public.'Ciudads'.id;", { type: sequelize.QueryTypes.SELECT})

                include: [{
                    model: Ciudad,
                    as: 'ciudades',
                    include:[{
                        model: Departamento,
                        as: 'departamentos'
                    }]
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Ciudad, as:'ciudades'}, 'createdAt', 'DESC']
                ],
            })
            .then((usuarios) => res.status(200).send(usuarios))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res){
        return Usuario
            .findById(req.params.id, {
                include: [{
                    model: Ciudad,
                    as: 'ciudades'
                }],
            })
            .then((usuario) =>{
                if(!usuario){
                    return res.status(404).send({
                        message: 'Usuario no encontrado',
                    });
                }
                return res.status(200).send(usuario);
            })
            .catch(error => res.status(400).send(error));
    },
    add(req, res){
        return Usuario
            .create({

                id_ciudad: req.body.id_ciudad,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                email: req.body.email,
                password: req.body.password,

            })
            .then(usuario => res.status(201).send(usuario))
            .catch(error => res.status(400).send(error));
    },
    update(req, res){
        return Usuario
            .findById(req.params.id, {
                include: [{
                    model: Ciudad,
                    as: 'ciudades'
                }],
            })
            .then(usuario =>{
                if(!usuario){
                    return res.status(404).send({
                        message: 'Usuario no encontrado'
                    });
                }
                return usuario
                    .update({
                        id_ciudad: req.body.id_ciudad || usuario.id_ciudad,
                        nombres: req.body.nombres || usuario.nombres,
                        apellidos: req.body.apellidos || usuario.apellidos,
                        email: req.body.email  || usuario.email,
                        password: req.body.password || usuario.password
                    })
                    .then(usuario => res.status(200).send(usuario))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => {res.status(400).send(error)
            });
    },
    delete(req, res){
        return Usuario
            .findById(req.params.id)
            .then(usuario =>{
                if(!usuario){
                    
                    return res.status(404).send({
                        message: 'Usuario no encontrado'
                    
                        
                    });
                    
                }
                Usuario.destroy({
                        where:{
                            id:req.params.id
                        }
                    })
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));      
            })
            .catch((error) => res.status(400).send(error));
    },

    findByEmail(req, res){
        return Usuario
        .find({
            where:{
                email: req.params.email,
                password: req.params.password
            }
        })
        .then(usuario =>{
            if(!usuario){
                return res.status(404).send({
                    message: 'Usuario No Encontrado'
                });
            }
            return res.status(200).send(usuario);        
        })
        .catch((error) => res.status(400).send(error))
    }
};