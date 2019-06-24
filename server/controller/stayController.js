var express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
var stays = require('../models/stay');

var router = express.Router();

router.get('/', (req, res) => {

    var allStays = stays.getStayList();
    return res.json(allStays);
});

module.exports = router;