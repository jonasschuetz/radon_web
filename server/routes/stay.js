var models = require('../models/index');
var express = require('express');
var router = express.Router();
var moment = require('moment');
const {
    Op
} = require('sequelize');

router.use(express.json());
//HTTP Request Handling für die Route /api/stay
router.get('/', function(req, res) {
    models.stay.findAll({
        where: {
            startTime: {
                [Op.gte]: moment().subtract(1, 'years').toDate()
            }
        }
    }).then((result) => res.json(result))
});

//Wird ein neuer Stay angelegt wird auch die MitarbeiterDosis neu berechnet. 
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

//Es werden nur Aufenthalte für den Mitarbeiter mit der entsprechenden ID zurückgegeben. 
router.get('/employee/:id', function(req, res) {
    models.stay.findAll({
        where: {
            employeeId: req.params.id,
            startTime: {
                [Op.gte]: moment().subtract(1, 'years').toDate()
            }
        }
    }).then((result) => res.json(result));
});


//Berechnet die neue Dosis des Mitarbeiters. 
const updateEmployeeDosis = empId => {
    models.stay.findAll({
        where: {
            employeeId: empId,
            startTime: {
                [Op.gte]: moment().subtract(1, 'years').toDate()
            }
        }
        //Nach der Berechnung wird die neue Dosis gespeichert. 
    }).then(stays => {
            var dosisSum = 0;
            for (s in stays) {
                dosisSum = dosisSum + parseFloat(stays[s].dose);
            }
            models.employee.update({
                dosis: dosisSum
            }, {
                where: {
                    id: empId
                }
            });
        }

    )
};



module.exports = router;