'use strict';
const Sequelize = require('sequelize');
const stay = require('../models/stay');

module.exports = (sequelize, DataTypes) => {
    const Model = Sequelize.Model;

    class room extends Model {}

    room.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        averageValue: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        modelName: 'room',
        sequelize
    });

    room.create({
        name: "Dummy Room",
        averageValue: 1001
    })

    //room.hasMany(Sequelize.stay);

    return room;
}