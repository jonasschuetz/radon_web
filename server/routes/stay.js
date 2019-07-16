var models = require('../models/index');
var express = require('express');
var router = express.Router();

router.use(express.json());

router.get('/', function(req, res) {
    models.stay.findAll().then((result) => res.json(result))
});

router.post('/create', function(req, res) {
    console.log(req.body);
    models.stay.create({
        dose: req.body.dose,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        roomId: req.body.roomId,
        employeeId: req.body.employeeId
    }).then((result) => res.json(result))
})

router.get('/employee/:id', function(req, res) {
    models.stay.findAll({ where: { employeeId: req.params.id } }).then((result) => res.json(result));
});
module.exports = router;