const server = require('express').Router();
const { User, Product, Cart_Product, Order } = require('../db.js');
const Sequelize = require('sequelize');
const { checkAuth, isAdmin } = require('./middlewares.js');
const  Op  = Sequelize.Op; // Esto permite hacer operaciones/búsquedas en Sequelize

//TRAER TODAS LAS ÓRDENES
server.get('/', isAdmin, (req, res) => {
    console.log('GET ORDER',req.user)
    Order.findAll({
        include: [{
            model: Product,
            through: {
                attributes:  ['state', 'quantity', 'price', 'productId']
            }
        }]
    })
    .then( resOrder => {
        !resOrder.length ?  res.json("No hay ordenes disponibles.") : res.json(resOrder) 
    })
    .catch( err => res.json(err))
});

//TRAER ORDENES DE UN CLIENTE EN PARTICULAR
server.get('/users', checkAuth, (req, res) => {
    Order.findAll({
        where: { userId: req.user.id },
        include: [{
            model: Product,
            through: {
                attributes:  ['state', 'quantity', 'price', 'productId']
            }
        }]
    })
    .then(ordenes => {
        console.log(ordenes)
        res.send(ordenes)
    })
    .catch( err => res.send(err))
});

//TRAER UNA ORDEN PARTICULAR
server.get('/:id', checkAuth, (req, res) => {
    Order.findByPk(req.params.id, {
        include: [{
            model: Product,
            through: {
                attributes:  ['state', 'quantity', 'price', 'productId']
            }
        }]
    })
    .then( respon => {
        respon === null ? res.json("La orden solicitada no existe.") : res.json(respon)
    })
    .catch( err => res.json(err))
});

//CREAR UNA ORDEN NUEVA A PARTIR DE LOCALSTORAGE
server.post('/', (req, res) => {
    Order.create({userId: req.user.id})
    .then(order => {
        for(let item of req.body) {
            console.log(item.id)
            order.addProduct(item.id)
            .then(ord => {
                console.log(ord)
                Cart_Product.update({quantity: item.quantity}, {
                    where: {
                        productId: item.id
                    }
                })
                .then(nuevaOrden => {
                    res.send(nuevaOrden)
                })
                .catch(err => res.send(err))               
            })
            .catch(err => res.send(err))
        }
    })
    .catch(err => res.send(err))
});

//ACTUALIZA ESTADO DE ORDEN
server.put('/:id', isAdmin, (req, res) => {
    Cart_Product.update({state: req.body.state}, {
        where: {
            orderId: req.params.id
        }
    })
    .then(orden => {
        console.log(orden)
        res.send(orden)
    })
    .catch( err => res.send(err))
});

//VACÍA CARRITO Y CANCELA ORDEN PERO SIN BORRAR REGISTRO
server.put('/empty/:id', checkAuth, (req, res) => {
    Cart_Product.update({state: "cancelled"}, {
        where: 
            { orderId: req.params.id }
    })
    .then(orderDeleted => {
        console.log(orderCancelled) 
        res.send("/")
    })
    .catch( err => res.json(err))
});

module.exports = server;