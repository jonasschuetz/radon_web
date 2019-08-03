var models = require('../models/index');
var express = require('express');
var router = express.Router();
var http = require('http');

router.use(express.json());

router.get('/', function(req, res) {
    models.stay.findAll().then((result) => res.json(result))
});

//TODO: Im Bericht erklären, zusammen mit updateEmployeeDosis. 
router.post('/create', function(req, res) {
    models.stay.create({
        dose: req.body.dose,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        roomId: req.body.roomId,
        employeeId: req.body.employeeId
    }).then((result) => {
        updateEmployeeDosis(req.body.employeeId);
        res.json(result);
    })
});

router.get('/employee/:id', function(req, res) {
    models.stay.findAll({ where: { employeeId: req.params.id } }).then((result) => res.json(result));
});



const updateEmployeeDosis = empId => {
    var dosisSum = 0.0;
    models.employee.findOne({
        where: { id: empId }
    }).then(result => {
        dosisSum = parseFloat(result.dosis);
    }).then(
        models.stay.findAll({
            where: { employeeId: empId }
        }).then(stays => {
                for (s in stays) {
                    dosisSum = dosisSum + parseFloat(stays[s].dose);
                }
                models.employee.update({
                    dosis: dosisSum
                }, { where: { id: empId } });
            }

        )
    )
};

module.exports = router;