const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

var { CartItem } = require('../models/cartItem');

router.get('/', (req, res) => {
    CartItem.find({})
        .exec()
        .then((CartItem) => {
            res.json(CartItem);
            console.log('get CartItems succeeded')
        })
        .catch((err) => console.log(`Error get CartItems:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    CartItem.findById(req.params.id)
        .exec()
        .then((CartItem) => {
            res.json(CartItem);
            console.log('get CartItem succeeded')
        })
        .catch((err) => console.log(`Error get CartItem:${JSON.stringify(err, undefined, 2)}`));
});


router.post('/', (req, res) => {
    var newCartItem = new CartItem({
        productId : req.body.productId,
        cartId :  req.body.cartId,
        amount :  req.body.amount, 
        cost :  req.body.cost
    });
    newCartItem.save()
        .then((CartItem) => {
            res.json(CartItem);
            console.log('post CartItem succeeded')
        })
        .catch((err) => console.log(`Error post CartItem: ${JSON.stringify(err, undefined, 2)}`));
});


router.put('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    var newCartItem = {
        productId : req.body.productId,
        cartId :  req.body.cartId,
        amount :  req.body.amount, 
        cost :  req.body.cost
    };
    CartItem.findOneAndUpdate({'_id':req.params.id}  , {$set : newCartItem},{new:true})
        .then((CartItem) => {
            res.json(CartItem);
            console.log('Update CartItem succeeded')
        })
        .catch((err) => console.log(`Error update CartItem: ${JSON.stringify(err, undefined, 2)}`));
});


router.delete('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }

    CartItem.findOneAndRemove({'_id':req.params.id})
        .then((CartItem) => {
            res.json(CartItem);
            console.log('Delete CartItem succeeded')
        })
        .catch((err) => console.log(`Error delete CartItem: ${JSON.stringify(err, undefined, 2)}`));
});

module.exports = router;