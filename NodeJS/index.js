const express = require('express');
const bodyParser = require('body-parser');
const {mongoose}=require('./db.js');
const cors = require('cors');


var cartController = require('./controllers/cartController');
var userController = require('./controllers/userController');
var categoryController = require('./controllers/categoryController');
var productController = require('./controllers/productController');
var cartItemController = require('./controllers/cartItemController');
var orderController = require('./controllers/orderController');
var cartItemsController = require('./controllers/cartItemsController');
var openCartController = require('./controllers/openCartController');
var verifyController = require('./controllers/verifyController');

var app=express(); 
app.use(cors({origin : 'http://localhost:4200'}));
app.use(bodyParser.json());


app.listen(3000, ()=>console.log('Server started at port: 3000'));


app.use('/cart',cartController);
app.use('/user',userController);
app.use('/category',categoryController);
app.use('/product',productController);
app.use('/cartItem',cartItemController);
app.use('/order',orderController);
app.use('/cartItems',cartItemsController);
app.use('/openCart',openCartController);
app.use('/verify',verifyController);
