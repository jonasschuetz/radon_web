var models = require('../models/index');
var express = require('express');
var router = express.Router();
var moment = require('moment');
const {
    Op
} = require('sequelize');


router.use(express.json());


//HTTP Request Handling für die Route /api/employee
router.get('/', function(req, res) {
    models.employee.findAll().then((result) => res.json(result))
});

//Employee mit der entsprechenden ID wird zurückgegeben. 
router.get('/:id', function(req, res) {
    models.employee.findOne({ where: { id: req.params.id } }).then((result) => res.json(result));
});

router.get('/updateEmpDosis/:id', function(req, res) {
    models.stay.findAll({
        where: {
            employeeId: req.params.id,
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
                    id: req.params.id
                }
            });
        }

    ).then((result) => res.json(result))
});

module.exports = router;