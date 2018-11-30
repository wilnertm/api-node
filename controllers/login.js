const Usuario = require('../models').Usuario;
const jwt = require('jsonwebtoken');
var express = require('express');
var app = express();

module.exports = {
    validar(req, res) {
        return Usuario
            .find({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            })
            .then(usuario => {
                if (!usuario) {
                    return res.status(404).send({
                        message: 'Usuario No Encontrado'
                    });
                } else {
                    jwt.sign({ usuario }, 'secretkey', (err, token) => {
                        res.json({
                            message: 'Login Ok',
                            token
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