const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

var { Cart } = require('../models/cart');
var { CartItem } = require('../models/cartItem');

router.get('/', (req, res) => {
    Cart.find({})
        .exec()
        .then((cart) => {
            res.json(cart);
            console.log('get carts succeeded')
        })
        .catch((err) => console.log(`Error get carts:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    Cart.findById(req.params.id)
        .exec()
        .then((cart) => {
            res.json(cart);
            a = res.json(cart);
            console.log('get Cart succeeded')
        })
        .catch((err) => console.log(`Error get Cart:${JSON.stringify(err, undefined, 2)}`));
});


router.post('/', (req, res) => {
    var newCart = new Cart({
        customerId: req.body.customerId,
        date: new Date()
    });
    newCart.save()
        .then((cart) => {
            res.json(cart);
            console.log('post Cart succeeded')
        })
        .catch((err) => console.log(`Error post Cart: ${JSON.stringify(err, undefined, 2)}`));
});


router.put('/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    var newCart = {
        customerId: req.body.customerId,
        date: new Date()
    };
    Cart.findOneAndUpdate({ '_id': req.params.id }, { $set: newCart }, { new: true })
        .then((cart) => {
            res.json(cart);
            console.log('Update Cart succeeded')
        })
        .catch((err) => console.log(`Error update Cart: ${JSON.stringify(err, undefined, 2)}`));
});


router.delete('/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    Cart.findById({ '_id': req.params.id })
        .then((cart) => {
            CartItem.remove(
                {
                    "cartId": {
                        $in: cart._id
                    }
                }
            )
            .exec();
            return cart.remove();
        })
        .then((cart) => {
            res.json(cart);
            console.log('delete Cart succeeded')
        })
        .catch((err) => console.log(`Error delete Cart: ${JSON.stringify(err, undefined, 2)}`));
});

module.exports = router;