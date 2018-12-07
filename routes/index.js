var express = require('express');
var router = express.Router();

const departamentoController = require('../controllers').departamento;
const ciudadController = require('../controllers').ciudad;
const usuarioController = require('../controllers').usuario;
const actividadController = require('../controllers').actividad;
const opcionController = require('../controllers').opcion;
const actividadInvitadoController = require('../controllers').actividad_invitado;
const moduloController = require('../controllers').modulo;
const notaController = require('../controllers').nota;
const correoController = require('../controllers').correo;
const telefonoController = require('../controllers').telefono;
const clienteController = require('../controllers').cliente;
const loginController = require('../controllers').login;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Rest del departamento */
router.get('/api/departamento', departamentoController.list);
router.get('/api/departamento/:id', departamentoController.getById);
router.post('/api/departamento', departamentoController.add);
router.put('/api/departamento/:id', departamentoController.update);
router.delete('/api/departamento/:id', departamentoController.delete);

/*Rest de la ciudad */
router.get('/api/ciudad', ciudadController.list);
router.get('/api/ciudad/:id', ciudadController.getById);
router.post('/api/ciudad', ciudadController.add);
router.put('/api/ciudad/:id', ciudadController.update);
router.delete('/api/ciudad/:id', ciudadController.delete);

/* Rest del usuario*/
router.get('/api/usuario', usuarioController.list);
router.get('/api/usuario/:id', usuarioController.getById);
router.post('/api/usuario', usuarioController.add);
// router.post('/api/usuario/emailto/:email,:password', usuarioController.validar);
router.post('/api/usuario/email', usuarioController.findByEmail);
router.post('/api/findusuario', usuarioController.complete);
router.put('/api/usuario/:id', usuarioController.update);
router.delete('/api/usuario/:id', usuarioController.delete);

/* Rest del login*/
router.post('/api/login', loginController.validar);

/* Rest de la actividad*/
router.post('/api/conteo_actividad', actividadController.conteo);
router.post('/api/actividades_invitados', actividadController.actividadesUser);
router.get('/api/actividad', actividadController.list);
router.post('/api/actividad_usuario', actividadController.createUser);
router.get('/api/actividad/:id', actividadController.getById);
router.post('/api/actividad', actividadController.add);
router.put('/api/actividad/:id', actividadController.update);
router.delete('/api/actividad/:id', actividadController.delete);

/* Rest de las opciones*/ 
router.get('/api/opcion', opcionController.list);
router.get('/api/opcion/:id', opcionController.getById);
router.post('/api/opcion', opcionController.add);
router.put('/api/opcion/:id', opcionController.update);
router.delete('/api/opcion/:id', opcionController.delete);

/* Rest De Actividades invitados */
router.get('/api/actividad_invitado', actividadInvitadoController.list);
router.get('/api/actividad_invitado/:id', actividadInvitadoController.getById);
router.post('/api/actividad_invitado', actividadInvitadoController.add);
router.put('/api/actividad_invitado/:id', actividadInvitadoController.update);
router.delete('/api/actividad_invitado/:id', actividadInvitadoController.delete);

/* Rest De Modulos*/
router.get('/api/modulo', moduloController.list);
router.get('/api/modulo/:id', moduloController.getById);
router.post('/api/modulo', moduloController.add);
router.put('/api/modulo/:id', moduloController.update);
router.delete('/api/modulo/:id', moduloController.delete);

/* Rest De Modulos*/
router.post('/api/nota', notaController.list);
router.get('/api/nota/:id', notaController.getById);
router.post('/api/notas', notaController.add);
router.put('/api/nota/:id', notaController.update);
router.delete('/api/nota/:id', notaController.delete);

/* Rest De Correos*/
router.get('/api/correo', correoController.list);
router.get('/api/correo/:id', correoController.getById);
router.post('/api/correo', correoController.add);
router.put('/api/correo/:id', correoController.update);
router.delete('/api/correo/:id', correoController.delete);

/* Rest De Telefonos*/
router.get('/api/telefono', telefonoController.list);
router.get('/api/telefono/:id', telefonoController.getById);
router.post('/api/telefono', telefonoController.add);
router.put('/api/telefono/:id', telefonoController.update);
router.delete('/api/telefono/:id', telefonoController.delete);

/* Rest De Clientes*/
router.post('/api/clientes', clienteController.list);
router.get('/api/cliente/:id', clienteController.getById);
router.post('/api/cliente', clienteController.add);
router.post('/api/cliente/cn', clienteController.findByCn);
router.put('/api/cliente/:id', clienteController.update);
router.delete('/api/cliente/:id', clienteController.delete);
router.post('/api/findCliente', clienteController.complete);


module.exports = router;
