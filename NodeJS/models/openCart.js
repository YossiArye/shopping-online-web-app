const mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;



var OpenCart = mongoose.model('OpenCart', {
    "customerId": { type: ObjectID },
    "cost": { type: Number },
    "date": { type: String },
    "receipt": [{
        "id":  String,
        "productName": String,
        "amount": String,
        "cost": String
    }]

});

module.exports = { OpenCart };