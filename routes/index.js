var express = require('express');
var router = express.Router();

const departamentoController = require('../controllers').departamento;
const ciudadController = require('../controllers').ciudad;
const usuarioController = require('../controllers').usuario;



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
router.post('/api/usuario/emailto/:email,:password', usuarioController.findByEmail);
router.put('/api/usuario/:id', usuarioController.update);
router.delete('/api/usuario/:id', usuarioController.delete);

/* Rest del login*/



module.exports = router;
