const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

var { Order } = require('../models/order');

router.get('/', (req, res) => {
    Order.find({})
        .exec()
        .then((Order) => {
            res.json(Order);
            console.log('get Orders succeeded')
        })
        .catch((err) => console.log(`Error get Orders:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/threeOrders', (req, res) => {
    Order.aggregate([
        {"$group" : {_id:"$deliveryDate", count:{$sum:1}}}
    ])
        .exec()
        .then((Order) => {
            res.json(Order);
            console.log(Order)
        })
        .catch((err) => console.log(`Error get Orders:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/count', (req, res) => {
    Order.countDocuments({})
        .exec()
        .then((Order) => {
            res.json(Order);
        })
        .catch((err) => console.log(`Error get Orders:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    Order.findById(req.params.id)
        .exec()
        .then((Order) => {
            res.json(Order);
            console.log('get Order succeeded')
        })
        .catch((err) => console.log(`Error get Order:${JSON.stringify(err, undefined, 2)}`));
});


router.post('/', (req, res) => {
    var newOrder = new Order({
        customerId : req.body.customerId,
        // cartId :  req.body.cartId,
        cost  :  req.body.cost,
        city :  req.body.city,
        street :  req.body.street,
        deliveryDate : req.body.deliveryDate,
        orderDate :  req.body.orderDate,
        creditCard : req.body.creditCard,
        receipt : req.body.receipt
    });
    newOrder.save()
        .then((Order) => {
            res.json(Order);
            console.log('post Order succeeded')
        })
        .catch((err) => console.log(`Error post Order: ${JSON.stringify(err, undefined, 2)}`));
});


router.put('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    var newOrder = {
        customerId : req.body.customerId,
        // cartId :  req.body.cartId,
        cost  :  req.body.cost,
        city :  req.body.city,
        street :  req.body.street,
        deliveryDate : req.body.deliveryDate,
        orderDate :  req.body.orderDate,
        creditCard : req.body.creditCard
    };
    Order.findOneAndUpdate({'_id':req.params.id}  , {$set : newOrder},{new:true})
        .then((Order) => {
            res.json(Order);
            console.log('Update Order succeeded')
        })
        .catch((err) => console.log(`Error update Order: ${JSON.stringify(err, undefined, 2)}`));
});


router.delete('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }

    Order.findOneAndRemove({'_id':req.params.id})
        .then((Order) => {
            res.json(Order);
            console.log('Delete Order succeeded')
        })
        .catch((err) => console.log(`Error delete Order: ${JSON.stringify(err, undefined, 2)}`));
});




module.exports = router;