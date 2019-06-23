const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const stays = require('../server/models/stay');

const ENV = process.env.NODE_ENV;
const PORT = 8080;

const dbURL = 'http://86.119.40.8:8008/stays';

const app = express();
app.use(express.json);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});

module.exports = app;