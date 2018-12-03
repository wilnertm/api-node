const Cliente = require('../models').Cliente;
const Correo = require('../models').Correo;
const Telefono = require('../models').Telefono;
const Ciudads = require('../models').Ciudad;



module.exports = {
    list(req, res) {
        return Cliente
            .findAndCountAll({
                where: {
                    activo: true,
                    $or: [
                        {
                            nombre: {
                                $ilike: "%" + req.body.nombre + "%",
                            }
                        },
                        {
                            cn: {
                                $ilike: "%" + req.body.nombre + "%"
                            }
                        }
                    ]
                },
                include: [{
                    model: Correo,
                    as: 'correosCliente',
                }, {
                    model: Telefono,
                    as: 'telefonosCliente',
                }, {
                    model: Ciudads,
                    as: 'ciudadCliente',
                }],
                limit: 10,
                offset: req.body.rango,
            })
            .then((cliente) => res.status(200).send(cliente))
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            })
    },
    getById(req, res) {
        return Cliente
            .findById(req.params.id, {
                include: [{
                    model: Correo,
                    as: 'correosCliente'
                }, {
                    model: Telefono,
                    as: 'telefonosCliente'
                }, {
                    model: Ciudads,
                    as: 'ciudadCliente'
                }]
            })
            .then((cliente) => {
                if (!cliente) {
                    return res.status(404).send({
                        message: 'Cliente no encontrado'
                    })
                }
                return res.status(200).send(cliente)
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            })
    },
    add(req, res) {
        Cliente.create({
            nombre: req.body.detail.nombre,
            activo: true,
            cn: req.body.detail.cn,
            id_ciudad: req.body.detail.id_ciudad,
            nit: req.body.detail.nit
        })
            .then((cliente) => {
                let correos = req.body.correos
                if (Array.isArray(correos)) {
                    for (let i = 0; i < correos.length; i++) {
                        Correo.create({
                            include: [{
                                model: Correo,
                                as: 'correosCliente'
                            }],
                            id_cliente: cliente.id,
                            email: correos[i]
                        })
                    }
                }
                let telefonos = req.body.telefonos
                if (Array.isArray(telefonos)) {
                    for (let a = 0; a < telefonos.length; a++) {
                        Telefono.create({
                            include: [{
                                model: Telefono,
                                as: 'telefonosCliente'
                            }],
                            id_cliente: cliente.id,
                            numero: telefonos[a]
                        })
                    }
                }
                res.status(200).send(cliente)
                return;
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            })
    },
    update(req, res) {
        return Cliente
            .findById(req.params.id, {
                include: [{
                    model: Correo,
                    as: 'correosCliente'
                }, {
                    model: Telefono,
                    as: 'telefonosCliente'
                }, {
                    model: Ciudads,
                    as: 'ciudadCliente'
                }]
            })
            .then((cliente) => {
                if (!cliente) {
                    return res.status(404).send({
                        message: 'Cliente no encontrado'
                    })
                }
                return cliente
                    .update({
                        nombre: req.body.nombre,
                        nit: req.body.nit,
                        id_ciudad: req.body.id_ciudad
                    })
                    .then((cliente) => res.status(200).send(cliente))
                    .catch((error) => {
                        res.status(400).send(error);
                        console.log(error);
                    })
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            })
    },
    delete(req, res) {
        return Cliente
            .findById(req.params.id)
            .then((cliente) => {
                if (!cliente) {
                    return res.status(404).send({
                        message: 'Cliente no encontrado'
                    })
                }
                Cliente.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => res.status(200).send())
                    .catch((error) => {
                        res.status(400).send(error);
                        console.log(error);
                    })
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            })
    },
    complete(req, res) {
        return Cliente
            .findAll({
                where: {
                    $or: [
                        {
                            nombre: {
                                $ilike: "%" + req.body.nombre + "%",
                            }
                        },
                        {
                            cn: {
                                $ilike: "%" + req.body.nombre + "%"
                            }
                        }
                    ]
                }
            })
            .then((cliente) => {
                if (!cliente) {
                    res.status(404).send({
                        message: 'Usuario no encontrado'
                    })
                }
                return res.status(200).send(cliente)
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            })
    },
    findByCn(req, res) {
        return Cliente
            .find({
                where: {
                    cn: req.body.cn,
                }
            })
            .then(cliente => {
                if (!cliente) {
                    return res.status(404).send({
                        message: 'Cliente No Encontrado'
                    });
                }
                return res.status(200).send(cliente);
            })
            .catch((error) => {
                res.status(400).send(error)
                console.log(error);
            })
    },
}