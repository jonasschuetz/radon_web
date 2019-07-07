'use strict';
module.exports = (sequelize, DataTypes) => {
    var employee = sequelize.define('employee', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dosis: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    });

    employee.associate = function(models) {
        models.employee.hasMany(models.stay);
    };

    return employee;
}