const mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;

var Product =mongoose.model('Product',{ 
    "categoryId" : {type:ObjectID}, 
    "name" : {type:String}, 
    "cost" : {type:Number},
    "url" : {type:String}
});

module.exports= {Product};