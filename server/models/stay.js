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

    stay.associate = function(models) {
        models.stay.belongsTo(models.room, {
            as: 'room',
            foreignKey: 'roomId'
        })
    }
    stay.associate = function(models) {
        models.stay.belongsTo(models.employee, {
            as: 'employee',
            foreignKey: 'employeeId'
        })
    }

    return stay;
}