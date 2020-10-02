const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js')
const userRouter = require('./user.js');
const orderRouter = require('./orders.js');
const authRouter = require('./auth.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/users',userRouter);
router.use('/orders',orderRouter);
router.use('/auth',authRouter);

module.exports = router;

