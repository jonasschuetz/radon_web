const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

var router = express.Router;

router.get('/stays', function(req, res) {
    retriveAll();
});



module.exports = retriveAll;