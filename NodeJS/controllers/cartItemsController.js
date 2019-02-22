const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

var { Cart } = require('../models/cart');
// var { CartItems } = require('../models/cartItems');


router.get('/', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    Cart.aggregate([
        // { "$match":  {"_id" : ObjectID(req.params.id)}},
        {
            $lookup:
            {
                from: "cartitems",
                localField: "_id",
                foreignField: "cartId",
                as: "cartItems" 
            }
        }
    ]).exec()
        .then((cartItems) => {
            res.json(cartItems);
            console.log('get cartItems succeeded')
        })
        .catch((err) => console.log(`Error get cartItems:${JSON.stringify(err, undefined, 2)}`));


});


module.exports = router;