'use strict';
const Sequelize = require('sequelize');
const room = require('../models/room');

module.exports = (sequelize, DataTypes) => {
    var stay = sequelize.define('stay', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dose: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    });

    return stay;
}