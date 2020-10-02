const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

const Comment = sequelize.define('comment', {
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        max:{
            args:[1000]
        },
        min:{
            args:[50],
        },
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