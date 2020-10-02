const server = require('express').Router();
const { User, Product, Cart_Product, Order, Review, Comment, Address } = require('../db.js');
const Sequelize = require('sequelize');
const { checkAuth, isAdmin, isClient } = require('./middlewares.js');
const bcrypt = require('bcryptjs');

const  Op  = Sequelize.Op; // Esto permite hacer operaciones/búsquedas en Sequelize

//BORRA UN PRODUCTO CON TODAS SUS CANTIDADES DEL CARRITO
server.delete('/cart', checkAuth, (req, res) => {
    console.log('hola gente', req.body);
    User.findByPk(req.user.id)
    .then(usuario => {
        !usuario ? res.json("El usuario no existe.") : 
        Order.findAll({
            limit: 1,
      where: {
       userId: req.user.id
        },
        include: [{
            model: Product,
            through: {
                where: {
                  state: 'pending'
                  }
              }
        }],
      order: [ [ 'id', 'DESC' ] ]
        })
        .then( orderUser => {
            !orderUser ? res.json("El usuario no posee productos.") :
            orderUser[0].removeProduct(req.body.id)
            .then( removiTodo => res.send(`OK`)) 
        })
    })
});

//GET USERS
server.get('/', (req,res)=>{
    User.findAll()
    .then( user => {
        !user.length ? res.json("No hay usuarios disponibles.") : res.json(user)
    })
    .catch(err=>res.json(err))
});

//TRAER CARRITO DE USUARIO
server.get('/cart', checkAuth, (req, res) => {
    console.log('req user PROBANDO', req.user);
    Order.findAll({
        limit: 1,
        where: {
            userId: req.user.id
        },
        include: [{
            model: Product,
            through: {
                where: {
                    state: 'pending'
                }
            }   
        }],
        order: [ [ 'id', 'DESC' ] ]
    })
    .then(orden => {
        res.send(orden)
    })
    .catch(err => console.log('ERROR'))
});

//SEARCH USER BY ID OR EMAIL
server.get('/search', (req,res) => {
    User.findAll({
        where: {
            [Op.or]: {
                id: {
                    [Op.eq]: req.body.id
                },
                email: {
                    [Op.eq]: req.body.email
                }
            }
        },
    })
    .then(user => {
        !user.length ? res.send("La búsqueda realizada no arrojó resultados.") : res.send(user)
    })
    .catch(error => res.send(error))
})

//GET USER BY ID
server.get('/:id', (req,res)=>{
    User.findByPk(req.params.id)
        .then( user => {
        user === null ? res.json("La búsqueda realizada no arrojó resultados.") : res.json(user)
        })
        .catch(error => res.json(error))
});

server.delete('/addresses/:idAddress', checkAuth, (req, res) => {
    Address.destroy({
        where: {
            id: req.params.idAddress
        }
    })
    .then(address => {
        res.sendStatus(address);
    })
    .catch(err => console.log(err))
});

// DELETE USER
server.delete('/:id', (req,res)=>{
     User.destroy({
         where:{
             id: req.params.id
         }
     }).then(resultDelete => {
        resultDelete === null ? res.json("El usuario a eliminar, no existe.") : res.json(resultDelete)
        })
     .catch(error => res.json(error))
 })


//AGREGAR PRODUCTO AL CARRITO, CREAR USER Y/U ORDEN DE SER NECESARIO, Y REDIRECCIONAR AL CARRITO SI YA SE HABÍA AGREGADO
// FALTA OPCIÓN DE CREAR USUARIO TEMPORAL PARA RETENER ORDEN CREADA ANTES DE REGISTRARSE
server.post('/cart', checkAuth, (req, res) => {
    Order.findAll({
        limit: 1,
        where: {
            userId: req.user.id
        },
        include: [{
            model: Product,
            through: {
                where: {
                    state: 'pending'
                }
            }   
        }],
        order: [ [ 'id', 'DESC' ] ]
    })
    .then(orden => {
        if(orden[0].length === 0 || orden[0].dataValues.products.length === 0) {
            Order.create({userId: req.user.id})
            .then(ord => {
                ord.addProduct(req.body.id)
                .then(pr => {
                    Cart_Product.update({price: req.body.price}, {
                        where:{
                            productId: req.body.id,
                            orderId: ord.id
                        }
                    })
                    .then(prodlisto => {
                        res.send(ord);
                    }).catch(err => res.send(err))
                }).catch(err => res.send(err))
            })
            .catch(err => res.send(err))
        } else {
            for (let prod of orden[0].dataValues.products) {
                if (prod.dataValues.id === Number(req.body.id)) {
                    return res.send(`users/cart`);
                }
            }
            orden[0].addProduct(req.body.id)
            .then(pr => {
                Cart_Product.update({price: req.body.price}, {
                    where:{
                        productId: req.body.id,
                        orderId: orden[0].id
                    }  
                })
                .then(prodlisto => {
                    res.send(prodlisto);
                })
                .catch(err => {
                    res.send("/")
                })
            })
            .catch(err => console.log(err));
        }
    })
    .catch(err => console.log("error, no entra a orderFindAll")) //TESTEAR DESDE FRONT LUEGO
});

// Actualizar stock y enviar quantity de la compra de un prod 
// en particular al confirmarla.
server.put('/cart', checkAuth, (req, res) => {
    console.log('HOLAAAAA PUT')
    Order.findAll({
        limit: 1,
        where: { 
            userId: req.user.id, 
        }, 
        include: [
            { 
                model: Product,
                through: {
                    where: 
                    {
                        state: 'pending'
                    },
                    attributes:  ['quantity']
                }
            }
        ],
        order: [ [ 'id', 'DESC' ] ]
    })
    .then(order => {
        Cart_Product.update({quantity: req.body.quantity}, 
        {
            where: 
            {
                orderId: order[0].id,
                productId: req.body.id
            }
        })
        .then(respo => {
            res.send(respo)
        })
        .catch( err => res.json(err))
    })
    .catch(err => res.json(err))
});

// Actualizar stock y enviar quantity de la compra de un prod 
// en particular al confirmarla.
// Ruta para actualizar el stock de los productos (REVISAR!!!!!!)
server.put('/cart/complete', checkAuth, (req, res) => {
    Order.findAll({
        limit: 1,
        where: { 
            userId: req.user.id, 
        }, 
        include: [
            { 
                model: Product,
                through: {
                    where: 
                    {
                        state: 'pending'
                    },
                    attributes:  ['quantity']
                }
            }
        ],
        order: [ [ 'id', 'DESC' ] ]
    })
    .then(order => {
        Cart_Product.update({state: 'complete'}, 
        {
            where: 
            {
                orderId: order[0].id
            }
        })
        .then(() => {
            const stockI = req.body.stock - req.body.Cart_Product.quantity;
            Product.update({stock: stockI},
                {
                    where: 
                    {
                        id: req.body.id
                    }
                }
            )
        })
        .then(respo => {
            res.json(respo)
        })
        .catch( err => res.json(err))
    })
    .catch(err => res.json(err))
});

// TRAER REVIEWS DE USUARIO
server.get('/reviews', checkAuth, (req, res) => {
    Review.findAll({
        where: {
            userId: req.user.id
        }
    })
    .then(reviews => {
        console.log(reviews)
        res.send(reviews)
    })
    .catch(err => console.log(err));
})


// TRAER COMMENTS DE USUARIO
server.get('/comments', checkAuth, (req, res) => {
    Comment.findAll({
        where: {
            userId: req.user.id
        }
    })
    .then(comments => {
        res.send(comments)
    })
    .catch(err => console.log(err));
})

//RUTAS DE ADDRESS
server.get('/address', checkAuth, (req, res) => {
    Address.findAll({
        where: {
            userId: req.user.id
        }
    })
    .then(addresses => {
        res.send(addresses)
    })
    .catch(err => console.log(err));
})

server.get('/addresses/:idAddress', checkAuth, (req, res) => {
    Address.findOne({
        where: {
            id: req.params.idAddress
        }
    })
    .then(address => {
        res.send(address)
    })
    .catch(err => console.log(err));
})

server.post('/address', checkAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.user.id
        }
    })
    .then(user => {
        user.createAddress(req.body)
        .then(address => {
            res.send(address);
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
})

server.put('/addresses/:idAddress',checkAuth, (req, res) => {
    Address.update(req.body, {
        where: {
            id: req.params.idAddress
        }
    })
    .then(address => {
        res.send(address);
    })
    .catch(err => console.log(err))
});

// UPDATE PASSWORD USER
server.put('/reset', (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return next(err);
            req.body.password = hash;
            User.update({password: req.body.password},{
                where:{
                    username: req.body.username,
                }
            })
            .then(user => {
                res.send(user)
            })
            .catch(err => res.json(err))
        });
    });
});

//UPDATE USER
server.put('/:id', (req, res) => {
    User.update(req.body,{
        where:{
            id: req.params.id,
        }
    })
    .then(user => {
      res.json(user)
    })
    .catch(err => res.json(err))
});


module.exports = server;
