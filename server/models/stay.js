const http = require('http');
const express = require('express');

const dbURL = 'http://86.119.40.8:8008/stays';


//Formula to calculate the dose. 
const formula = 11;

class Stays {

    constructor(id, startDate, endDate, dose) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.dose = dose;
    }

    //TODO: Sicherstellen, dass hier wieder ein int zurückgegeben wird. Update Request muss auch ausgeführt werden. 
    static updateDoseAfterChange() {
        return this.startDate - this.endDate * dose;
    }

    retriveAll() {
        http.get(dbURL, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                console.log(JSON.parse(data));
                for (var d in data) {
                    new Stays(d.id, d.startTime, d.endTime, d.dose);
                };
            });

        }).on("error", (err) => {
            console.log("Error " + err);
        });
    }

    static update() {

    }

}

module.exports = Stays;