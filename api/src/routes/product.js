const server = require('express').Router();
const { Product, Category, Review, Comment, User } = require('../db.js');
const Sequelize = require('sequelize');
const  Op  = Sequelize.Op; // Esto permite hacer operaciones/búsquedas en Sequelize
const multer = require('multer');
const upload = multer({ dest: `${__dirname}/uploads` });
const { checkAuth, isAdmin } = require('./middlewares.js');


server.get('/', (req, res) => {
	Product.findAll()
		.then(product => {
		res.json(product);
		})
		.catch(err => console.log(err));
});

server.get('/buscador/:name', (req, res) => {
	if (!req.params.name) { // Si no hay búsqueda por keyword, devuelve todos los productos.		
		Product.findAll(
		{
			include: [{
				model: Category
			}]
		}
	)
	.then(prod => {
		res.send(prod);
	})
	.catch(err => console.log(err))
	}
	else {
		Product.findAll({ // Op.or es un simple OR y substring es ver si contiene el keyword.
			where: {
				[Op.or]: {
				    name: {
				    	[Op.like]: req.params.name
					},
				    name: {
				    	[Op.substring]: req.params.name
				    }
				}
			},
		})
	.then(prod => {
		res.status(200)
		res.send(prod);
	})
	.catch(err => console.log(err))
	}
});

server.get('/categories/:id', (req, res) => {
	Product.findOne({
		where: {
			id: req.params.id
		},
		include: [{
				model: Category
			}]
	})
	.then(product => {
		let test = []
		product.dataValues.categories.forEach(cat => test.push(cat.dataValues.id))
		res.send(test);
	})
	.catch(err => console.log(err));
});

server.get('/category/:name', ( req,res ) => {
	Product.findAll({
			include: [{
				model: Category,
					where: {
						name: req.params.name
					}
			}]
	})
  .then(productos => {
		res.json(productos)
	})
	.catch(err => console.log(err))
});

//RUTAS DE COMMENTS
server.get('/review/comments/:idReview', (req, res) => {
	Comment.findAll({
		where: {
			reviewId: req.params.idReview
		}
	})
	.then(comments => {
		res.send(comments)
	})
	.catch(err => console.log(err));
});

server.get('/reviews/comments/single/:idComment', (req, res) => {
	Comment.findOne({
		where: {
			id: req.params.idComment
		}
	})
	.then(comment => {
		res.send(comment)
	})
	.catch(err => console.log(err));
})

//RUTAS DE REVIEWS
server.get('/reviews/:idReview', (req, res) => {
	Review.findOne({
		where: {
			id: req.params.idReview
		}
	})
	.then(review => {
		res.send(review)
	})
	.catch(err => console.log(err));
});

server.get('/:id/review', (req, res) => {
	Review.findAll({
		where: {
			productId: req.params.id
		}
		
	})
	.then(products => {
		res.send(products)
	})
	.catch(err => console.log(err));
});

server.get('/:id', (req, res) => {
	Product.findOne({
		where: {
			id: req.params.id
		},
		include: [{
				model: Category
			}]
	})
		.then(product => {
			res.json(product);
		})
		.catch(err => res.json(err));
});

server.post('/', isAdmin, upload.single('images'), (req, res) => {
	const pr = { ...req.body, images: `${req.file.filename}`};

	Product.create(pr)
	.then(prod => {
		for (idCat of req.body.categoryId.split(' ')) {
			prod.addCategory(idCat);
		}
	})
	.then(prodListo => {
		res.status(200)
		res.send(prodListo)
	})
	.catch(err => res.json(err));
});

server.put('/:id', isAdmin, upload.single('images'), (req, res) => {
	let pr
	if (!req.file) {
		pr = req.body
	} else {
		pr = { ...req.body, images: `${req.file.filename}`}
	}
	Product.update(pr, {
		where: {
			id: req.params.id
		}
	})
	.then(() => {
		Product.findByPk(req.params.id)
		.then(prod => {
			for (idCat of req.body.categoryId.split(' ')) {
				prod.setCategories(Number(idCat));
			}
		})
	})		
	.then( b => {
		res.json(b);
    })
    .catch(err => res.json(err))
});

server.delete('/:id', isAdmin, (req, res) => {
	Product.destroy({
		where: {
			id: req.params.id
		}
	})
	// Product.findAll({order: ['id']})
	.then(es => {
		console.log(es)
		res.json(es)
	})
	.then(() => {
		res.send('/')
	})
	.catch(err => console.log(err));
});

// ACTUALIZAR RUTA DE DELETE (ELIMINAR CATEGORÍAS DE UN PRODUCTO)
server.delete('/:idProduct/category', isAdmin, (req, res) => {
	Product.findOne({
		where: {
			id: req.params.idProduct
		},
	})
	.then( productoDelete => {
		productoDelete.update({
			categoryId: null
		})
			Product.findAll()
			.then( ess => {
				res.json(ess)
			})
	})
});

server.post('/:id/review', checkAuth, (req, res) => {
	console.log(req.body)
	Product.findOne({
		where: {
			id: req.params.id
		}
	})
	.then(product => {
		product.createReview(req.body)
		.then(review => {
			res.send(review);
		})
		.catch(err => console.log(err))
	})
	.catch(err => console.log(err));
})

server.put('/reviews/:idReview', checkAuth, (req, res) => {
	Review.update(req.body, {
		where: {
			id: req.params.idReview
		}
	})
	.then(review => {
		res.send(review);
	})
	.catch(err => console.log(err))
})

server.delete('/reviews/:idReview', checkAuth, (req, res) => {
	Review.destroy({
		where: {
			id: req.params.idReview
		}
	})
	.then(review => {
		res.sendStatus(review);
	})
	.catch(err => console.log(err))
});

server.post('/review/comments/:idReview', checkAuth, (req, res) => {
	Review.findOne({
		where: {
			id: req.params.idReview
		}
	})
	.then(review => {
		review.createComment(req.body)
		.then(comment => {
			res.send(comment);
		})
		.catch(err => console.log(err))
	})
	.catch(err => console.log(err));
})

server.put('/reviews/comments/single/:idComment', checkAuth, (req, res) => {
	Comment.update(req.body, {
		where: {
			id: req.params.idComment
		}
	})
	.then(review => {
		res.send(review);
	})
	.catch(err => console.log(err))
})

server.delete('/reviews/comments/single/:idComment', checkAuth, (req, res) => {
	Comment.destroy({
		where: {
			id: req.params.idComment
		}
	})
	.then(comment => {
		res.sendStatus(comment);
	})
	.catch(err => console.log(err))
})


module.exports = server;