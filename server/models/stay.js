'use strict';
const Sequelize = require('sequelize');
const room = require('../models/room');

module.exports = (sequelize, DataTypes) => {
    const Model = Sequelize.Model;

    class stay extends Model {};

    stay.init({
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
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        modelName: 'stay',
        sequelize
    });

    //stay.belongsTo(room);

    return stay;
}