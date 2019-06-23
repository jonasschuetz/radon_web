const http = require('http');
const express = require('express');

const dbURL = 'http://86.119.40.8:8008/stays';

class Stays {
    static retriveAll(callback) {
        http.get(dbURL, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                console.log(JSON.parse(data).explanation);
            });


        }).on("Error: " + err.message);
    }


}

module.exports = Stays;