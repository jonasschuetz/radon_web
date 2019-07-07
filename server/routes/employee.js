var models = require('../models/index');
var express = require('express');
var router = express.Router();

router.use(express.json());

router.get('/', function(req, res) {
    models.employee.findAll().then((result) => res.json(result))
});

router.post('/create', function(req, res) {
    console.log(req.body);
    models.employee.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dosis: req.body.dosis
    }).then((result) => res.json(result))
})
module.exports = router;