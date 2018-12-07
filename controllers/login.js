const Usuario = require('../models').Usuario;
const Rol = require('../models').Rol;
const jwt = require('jsonwebtoken');
const sha_512 = require('../encrypt/hash');

module.exports = {
    validar(req, res) {
        let prueba = sha_512.createPass(req.body.password)
        return Usuario
            .find({
                where: {
                    email: req.body.email,
                    password: prueba                
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
    }
}