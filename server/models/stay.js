const http = require('http');
const express = require('express');
const request = require('request-promise');


const dbURL = 'http://86.119.40.8:8008/stays';


//Formula to calculate the dose. 
const formula = 11;
const MAX_Value = 10;

class Stays {

    constructor(id, startDate, endDate, dose) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.dose = dose;
        this.percentage = calculatePercentage(dose);
    }

    static calculatePercentage(dose) {
        return dose / MAX_Value;
    }

    //FIXME: Sicherstellen, dass hier wieder ein int zurückgegeben wird. Update Request muss auch ausgeführt werden. 
    static updateDoseAfterChange() {
        return this.startDate - this.endDate * dose;
    }

    static getAll() {
        Stays.allInstances = [];
        Stays.allInstances.push(this);

        return JSON.stringify(allInstances);
    }

    static createAll() {

    }

    retriveAll() {

        http.get('http://86.119.40.8:8008/stays', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                //FIXME: Anschauen ob dies nötig ist. 
                return data;
            });

        }).on("error", (err) => {
            console.log("Error " + err);
        });
    }

    static update() {

    }

}

module.exports = Stays;