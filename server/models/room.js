'use strict';
module.exports = (sequelize, DataTypes) => {
    var Room = sequelize.define('Room', {
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
    }, { timestamps: false });
    Room.associate = function(models) {
        models.Room.hasMany(models.Stay);
    };
    return Room;
}