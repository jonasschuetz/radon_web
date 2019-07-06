'use strict';
module.exports = (sequelize, DataTypes) => {
    var room = sequelize.define('room', {
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
        }
    });

    room.associate = function(models) {
        models.room.hasMany(models.stay);
    };

    return room;
}