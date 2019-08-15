var models = require('../models/index');
var express = require('express');
var router = express.Router();

router.use(express.json());

//HTTP Request Handling für die Route /api/employee
router.get('/', function(req, res) {
    models.employee.findAll().then((result) => res.json(result))
});

//Methode um einen neuen Mitarbeiter zu erstellen. 
router.post('/create', function(req, res) {
    console.log(req.body);
    models.employee.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dosis: req.body.dosis
    }).then((result) => res.json(result))
})

//Employee mit der entsprechenden ID wird zurückgegeben. 
router.get('/:id', function(req, res) {
    models.employee.findOne({ where: { id: req.params.id } }).then((result) => res.json(result));
});


module.exports = router;