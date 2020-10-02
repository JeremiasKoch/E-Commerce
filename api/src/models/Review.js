const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

const Review = sequelize.define('review', {
    rating: {
    	type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
        },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'hola',
        max:{
            args:[150]
        },
        min:{
            args:[5],
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        max:{
            args:[2000]
        },
        min:{
            args:[100],
        },
    },
    images: {
        type: DataTypes.STRING,
        allowNull: true
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
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