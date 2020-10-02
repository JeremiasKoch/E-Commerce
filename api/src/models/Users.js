const { DataTypes } = require('sequelize');
// const { Product } = require('./db.js');
// import db from './_db';
module.exports = (sequelize) => { 
    const User = sequelize.define('user', {
        firstname:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notNull:{
                        msg:'El campo nombre es requerido'
                    },
                    isAlpha:{
                        args:true,
                        msg:'El campo nombre solo acepta letras mayusculas y minusculas'
                    },
                    len:{
                        args:[3,20],
                        msg:'El campo nombre debe contener mas de 3 caracteres y menos de 20'
                    },
                    
                }
            }, 
        lastname:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notNull:{
                        msg:'El campo apellido es requerido'
                    },
                    isAlpha:{
                        args:true,
                        msg:'El campo apellido solo acepta letras mayusculas y minusculas'
                    },
                    len:{
                        args:[3,20],
                        msg:'El campo apellido debe contener mas de 3 caracteres y menos de 20'
                    },
                    
                }
            },   
        username: {
                type: DataTypes.STRING,
                allowNull:false,
                unique: true,
                validate:{
                    notNull:{
                        msg:'El campo nombre de usuario es requerido'
                    },
                    isAlphanumeric:{
                        args:true,
                        msg:'El campo nombre de usuario solo deben contener letras y numeros'
                    },
                    len:{
                        args:[3,50],
                        msg:'El campo nombre de usuario debe contener mas de 3 caracteres y menos de 50'
                    },
                    
                }
            },
        email: {
                type: DataTypes.STRING,
                allowNull:false,
                unique:true,
                validate:{
                    notNull:{
                        msg:'El campo email es requeido'
                    },
                    isEmail:{
                        args:true,
                        msg:'Debe ingresar un email valido'
                    },
                                    
                }
            },
        password: {
                type: DataTypes.STRING,
                allowNull:false,
                validate:{
                    notNull:{
                        msg:'El campo password es requerido'
                    },
                    len:{
                        args:[6,255],
                        msg:'El campo password debe contener mas de 6 caracteres y menos de 255'
                    },
                    
                }
            },
        phone: {
                type: DataTypes.BIGINT,
                allowNull:false,
                validate:{
                    notNull:{
                        msg:'El campo telefono es requerido'
                    },
                    isInt:{
                        args:true,
                        msg:'El campo telefono solo deben contener numeros'
                    },
                    len:{
                        args:[10,21],
                        msg:'El campo telefono debe contener mas de 10 caracteres y menos de 22'
                    },
                    
                }
            },
        role: {
            type: DataTypes.ENUM("client", "admin", "moderator"),
            allowNull: false,
            defaultValue: "client"
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
    User.createInstanceFromBody = function ({firstname, lastname, username, email, password, phone}) {
        return User.create({
            firstname,
            lastname,
            username,
            email,
            password,
            phone
        })
    };
 }
 
 