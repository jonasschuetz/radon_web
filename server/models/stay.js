'use strict';
module.exports = (sequelize, DataTypes) => {
    var Stay = sequelize.define('Stay', {
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
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { timestamps: false });
    return Stay;
}