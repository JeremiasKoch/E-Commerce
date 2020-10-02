const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

const Product = sequelize.define('product', {
    name: {
    	type: DataTypes.STRING,
        allowNull: false,
        },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
    	type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    price: {
    	type: DataTypes.DECIMAL(20, 2), 
    	allowNull: false
    },
    stock: {
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	validate: {
    		isInt: true
    	}
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
  });
}