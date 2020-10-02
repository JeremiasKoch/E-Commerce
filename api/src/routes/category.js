const server = require('express').Router();
const { Category } = require('../db.js');
const Sequelize = require('sequelize');
const  Op  = Sequelize.Op; // Esto permite hacer operaciones/búsquedas en Sequelize
const { isAdmin } = require('./middlewares.js');

server.get('/', (req, res) => {
	Category.findAll()
	.then(categor => {
		res.status(200)
		res.send(categor);
	})
	.catch(err => console.log(err));
});

server.post('/', isAdmin, (req, res) => {
	const pr = req.body;
	Category.createInstanceFromBody(pr)
	.then(cate => {
		res.status(200)
		res.send(cate);
	})
	.catch(err => (err));
});

server.put('/:id', isAdmin, (req, res) => {
	Category.update(req.body,
		{
		where:{
			id: Number(req.params.id)
		}
	})
	.then(cat => {
		res.status(200)
		res.send(cat);
	})
	.catch(err => console.log(err));
});

server.delete('/:id', isAdmin, (req, res) => {
	Category.destroy({
		where: {
			id: Number(req.params.id)
        }
    })
    Category.findAll({order: ['name']})
    .then(es => {
		res.status(200)
		res.send(es);
        // res.redirect('/category')
	})
	.then(es => {
        res.redirect('/category')
    })
    .catch(err => console.log(err));
		
});

server.get('/:id', ( req,res ) => {
	Category.findOne({
		where: {
			id: Number(req.params.id)
		}
	})
	.then(categ => {
		res.status(200)
		res.send(categ)
	})
	.catch(err => console.log(err) )
})


module.exports = server;


