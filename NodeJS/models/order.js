const mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;



var Order = mongoose.model('Order', {
    "customerId": { type: ObjectID },
    // "cartId": { type: ObjectID },
    "cost": { type: Number },
    "city": { type: String },
    "street": { type: String },
    "deliveryDate": { type: String },
    "orderDate": { type: Date },
    "creditCard": { type: Number },
    // "receipt": { type:mongoose.Schema.Types.Mixed }

    "receipt": [{
        "id":  String,
        "productName": String,
        "amount": String,
        "cost": String
    }]

});

module.exports = { Order };