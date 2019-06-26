var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/stay', function(req, res) {
    models.Stay.findAll().then((result) => res.json(result))
});

module.exports = router;