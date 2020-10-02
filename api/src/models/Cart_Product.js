const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
const Cart_Product = sequelize.define('Cart_Product', {
    state: {
        type: DataTypes.ENUM("pending", "refunded", "cancelled", "complete"),
        defaultValue: 'pending'
    },
    price: {
    	type: DataTypes.DECIMAL(20, 2)
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isInt: true
        }
    }
 });
}