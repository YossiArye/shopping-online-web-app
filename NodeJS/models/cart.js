const mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;

var Cart =mongoose.model('Cart',{ 
    "customerId" : {type:ObjectID},
    "date" : {type:Date}
});

module.exports= {Cart};