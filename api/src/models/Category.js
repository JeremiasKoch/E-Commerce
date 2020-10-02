const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    const Category = sequelize.define('category', {
        name:{
                type: DataTypes.STRING,
                allowNull: false
            },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
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
        
    Category.createInstanceFromBody = function ({name, description}) {
        return Category.create({
            name,
            description
        })
    };
}


 
