var models = require('../models/index');
var express = require('express');
var router = express.Router();

router.use(express.json());

router.get('/', function(req, res) {
    models.room.findAll().then((result) => res.json(result))
});

router.get('/:id', function(req, res) {
    models.room.findOne({ where: { id: req.params.id } }).then((result) => res.json(result));
});

module.exports = router;