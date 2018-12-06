const Usuario = require('../models').Usuario;
const Rol = require('../models').Rol;
const jwt = require('jsonwebtoken');
var express = require('express');

module.exports = {
    validar(req, res) {
        return Usuario
            .find({
                where: {
                    email: req.body.email,
                    password: req.body.password                
                },
                include: [{
                    model: Rol,
                    as: 'rol'
                }]
            })
            .then(usuario => {
                console.log("ACTIVO: ",usuario.activo)
                if(usuario.activo == false){
                    return res.status(403).send({
                        message: 'Usuario bloqueado comunicate con el administrador.'
                    })
                }
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario No Encontrado'
                    });
                }
                else {
                    jwt.sign({ usuario }, 'secretkey', (err, token) => {
                        res.json({
                            message: 'Login Ok',
                            token,
                            nombres: usuario.nombres + " " + usuario.apellidos,
                            identificador: usuario.id,
                            rol: usuario.rol
                        });
                        return;
                    });
                }
            })
            .catch((error) => res.status(400).send(error))
    },

    //Verificador de sesion
    verifyToken(req, res, next) {
        // Trae los valores del encabezado
        const bearerHeader = req.headers['authorization'];
        // Verifica si el bearer esta definido o no
        if (typeof bearerHeader !== 'undefined') {
            //Se eliminan los espacios del bearer si se tiene
            const bearer = bearerHeader.split(' ');
            // Trae los valores del arreglo
            const bearerToken = bearer[1];
            // Edita el token
            req.token = bearerToken;
            // Siguiente ejecución del middleware
            next();
        } else {
            // Respuesta si los valores no son validos Forbidden
            res.sendStatus(403);
        }
    }




}