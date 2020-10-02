const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    const Address = sequelize.define('address', {
        address:{
            type: DataTypes.STRING,
            allowNull: false,    
        }, 
        cp:{
            type: DataTypes.STRING,
            allowNull: false,    
        },   
        city:{
            type: DataTypes.STRING,
            allowNull: false,    
        },
        province:{
            type: DataTypes.STRING,
            allowNull: false,    
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
        }
    });
}
 
 