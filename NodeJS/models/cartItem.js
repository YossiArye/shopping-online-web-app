const mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;

var CartItem =mongoose.model('CartItem',{ 
    "productId" : {type:ObjectID},
    "cartId" : {type:ObjectID},
    "amount" : {type:Number}, 
    "cost" : {type:Number}
});

module.exports= {CartItem};