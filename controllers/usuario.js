const Usuario = require('../models').Usuario;
const Ciudad = require('../models').Ciudad;
const db = require('../models/index')
const Departamento = require('../models').Departamento
const Sequelize = require('sequelize');
const sha_512 = require('../encrypt/hash');

module.exports = {
    list(req, res) {
        return Usuario
            .findAll({
                where: {
                    activo: true
                },
                include: [{
                    model: Ciudad,
                    as: 'ciudades',
                    include: [{
                        model: Departamento,
                        as: 'departamentos'
                    }]
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: Ciudad, as: 'ciudades' }, 'createdAt', 'DESC']
                ],
            })
            .then((usuarios) => res.status(200).send(usuarios))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res) {
        return Usuario
            .findById(req.params.id, {
                include: [{
                    model: Ciudad,
                    as: 'ciudades'
                }],
            })
            .then((usuario) => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario no encontrado',
                    });
                }
                return res.status(200).send(usuario);
            })
            .catch(error => res.status(400).send(error));
    },

    findByEmail(req, res) {
        return Usuario
            .find({
                where: {
                    email: req.body.email,
                }
            })
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario No Encontrado'
                    });
                }
                return res.status(200).send(usuario);
            })
            .catch((error) => res.status(400).send(error))
    },
    add(req, res) {
        let pass = sha_512.createPass(req.body.password)
        return Usuario
            .create({
                id_ciudad: req.body.id_ciudad,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                email: req.body.email,
                password: pass,
                activo: true,
                id_rol: 2
            })
            .then(usuario => res.status(201).send(usuario))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Usuario
            .findById(req.params.id, {
                include: [{
                    model: Ciudad,
                    as: 'ciudades'
                }],
            })
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario no encontrado'
                    });
                }
                let pass = sha_512.createPass(req.body.password)
                return usuario
                    .update({
                        id_ciudad: req.body.id_ciudad,
                        nombres: req.body.nombres,
                        apellidos: req.body.apellidos,
                        email: req.body.email,
                        password: pass
                    })
                    .then(usuario => res.status(200).send(usuario))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => {
                res.status(400).send(error)
            });
    },
    delete(req, res) {
        return Usuario
            .findById(req.params.id)
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario no encontrado'
                    });
                }
                Usuario.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    validar(req, res) {
        return Usuario
            .find({
                where: {
                    email: req.params.email,
                    password: req.params.password
                }
            })
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario No Encontrado'
                    });
                }
                return res.status(200).send(usuario);
            })
            .catch((error) => res.status(400).send(error))
    },
    complete(req, res) {
        return Usuario
            .findAll({
                where: {
                    nombres: {
                        $ilike: "%" + req.body.nombres + "%", 
                    }
                }
            })
            .then((usuario) => {
                if (!usuario) {
                    res.status(404).send({
                        message: 'Usuario no encontrado'
                    })
                }
                return res.status(200).send(usuario)
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            })
    }
};