const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    const Order = sequelize.define('order', {
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        }
    })
}