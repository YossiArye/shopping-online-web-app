const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
var { OpenCart } = require('../models/openCart');


router.get('/', (req, res) => {
    OpenCart.find({})
        .exec()
        .then((OpenCart) => {
            res.json(OpenCart);
            console.log('get OpenCarts succeeded')
        })
        .catch((err) => console.log(`Error get OpenCarts:${JSON.stringify(err, undefined, 2)}`));
});





router.get('/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    OpenCart.find({ "customerId": req.params.id })
        .exec()
        .then((OpenCart) => {
            res.json(OpenCart);
            console.log(OpenCart)
        })
        .catch((err) => {
            console.log(`Error get open cart:${JSON.stringify(err, undefined, 2)}`)
            res.json("not found");

        });
});


router.post('/', (req, res) => {
    var newOpenCart = new OpenCart({
        customerId: req.body.customerId,
        cost: req.body.cost,
        date: req.body.date,
        receipt: req.body.receipt
    });
    newOpenCart.save()
        .then((OpenCart) => {
            res.json(OpenCart);
            console.log('post OpenCart succeeded')
        })
        .catch((err) => console.log(`Error post OpenCart: ${JSON.stringify(err, undefined, 2)}`));
});

router.delete('/remainOnlyMax/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    OpenCart.find().sort({ date: -1 }).limit(1)
        .then((OpenCart) => {
            return OpenCart;
        })
        .then((openCart) => {
            console.log(openCart[0].date)
            return OpenCart.remove({ $and: [{ date: { $ne: openCart[0].date } }, { customerId: { $in: ObjectID(req.params.id) } }] });
        })
        .then((OpenCart) => {

            res.json(OpenCart);
            console.log('Delete OpenCart succeeded')
        })
        .catch((err) => console.log(`Error delete OpenCart: ${JSON.stringify(err, undefined, 2)}`));

});

router.delete('/deleteAllForCustomer/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }

    OpenCart.remove({ customerId: { $in: ObjectID(req.params.id) } })
        .then((OpenCart) => {
            res.json(OpenCart);
            console.log('Delete OpenCart succeeded')
        })
        .catch((err) => console.log(`Error delete OpenCart: ${JSON.stringify(err, undefined, 2)}`));

});

// router.put('/:id', (req, res) => {
//     if(!ObjectID(req.params.id)){
//         return res.status(400).send(`Error id: ${req.params.id}`);
//     }
//     var newOpenCart = {
//         customerId : req.body.customerId,
//         // cartId :  req.body.cartId,
//         cost  :  req.body.cost,
//         city :  req.body.city,
//         street :  req.body.street,
//         deliveryDate : req.body.deliveryDate,
//         OpenCartDate :  req.body.OpenCartDate,
//         creditCard : req.body.creditCard
//     };
//     OpenCart.findOneAndUpdate({'_id':req.params.id}  , {$set : newOpenCart},{new:true})
//         .then((OpenCart) => {
//             res.json(OpenCart);
//             console.log('Update OpenCart succeeded')
//         })
//         .catch((err) => console.log(`Error update OpenCart: ${JSON.stringify(err, undefined, 2)}`));
// });


router.delete('/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }

    OpenCart.findOneAndRemove({ '_id': req.params.id })
        .then((OpenCart) => {
            res.json(OpenCart);
            console.log('Delete OpenCart succeeded')
        })
        .catch((err) => console.log(`Error delete OpenCart: ${JSON.stringify(err, undefined, 2)}`));
});

module.exports = router;