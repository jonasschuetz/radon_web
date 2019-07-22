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
    console.log(req.body);
    var empId = req.body.employeeId
    var URL = '/api/employee/updateDosis/';
    URL = URL.concat(empId);
    console.log(URL);
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

const updateEmployeeDosis = id => {
    var dosisSum = 0;
    models.stay.findAll({
        where: { employeeId: id }
    }).then(stays => {
            for (s in stays) {
                dosisSum = dosisSum + stays[s].dose;
            }
            models.employee.update({
                dosis: dosisSum
            }, { where: { id: id } });
        }

    );
};

module.exports = router;