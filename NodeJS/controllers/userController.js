const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
var { User } = require('../models/user');
var { Order } = require('../models/order');

router.get('/', (req, res) => {
    User.find({})
        .exec()
        .then((User) => {
            res.json(User);
            console.log('get Users succeeded')
        })
        .catch((err) => console.log(`Error get Users:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    User.findById(req.params.id)
        .exec()
        .then((User) => {
            res.json(User);
            console.log('get User succeeded')
        })
        .catch((err) => console.log(`Error get User:${JSON.stringify(err, undefined, 2)}`));
});


// router.post('/', (req, res) => {
//     var newUser = new User({
//         id: req.body.id,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         city: req.body.city,
//         street: req.body.street,
//         role: req.body.role
//     });
//     newUser.save()
//         .then((User) => {

//             res.status(200).json(""); 
//         })
//         .catch((err) => console.log(`Error post User: ${JSON.stringify(err, undefined, 2)}`));
// });
router.post('/register', (req, res) => {

    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (!user) {
                var newUser = new User({
                    // id: req.body.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    city: req.body.city,
                    street: req.body.street,
                    role: "customer"
                });
                return newUser.save()

            } else {
                throw 'Error: mail already existed!';
            }
        })
        .then((NewUser) => {
            let userDetails = { "_id": NewUser._id, "city": NewUser.city, "street": NewUser.street }
            let payload = { subject: NewUser._id };
            let token = jwt.sign(payload, 'secretCustomerKey');
            res.status(200).json({ token, userDetails });
            // res.status(200).json({ token, payload });
        })
        .catch((err) => {
            if (err === 'Error: mail already existed!') {
                res.status(401).send('Error: mail already existed!');
            }
            console.log(`Error post User: ${JSON.stringify(err, undefined, 2)}`)

        });

});




router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email })
        .exec()
        .then((User) => {
            if (!User) {
                res.status(401).send('Invalid email');
            } else if (User.password !== req.body.password) {
                res.status(401).send('Invalid password');
            } else {
                let userDetails = { "_id": User._id, "city": User.city, "street": User.street }
                let payload = { subject: User._id };
                if (User.role === "customer") {
                    let token = jwt.sign(payload, 'secretCustomerKey');
                    res.status(200).json({ token, userDetails });
                    // res.status(200).json({ token, payload });
                } else if (User.role === "admin") {
                    let token = jwt.sign(payload, 'secretAdminKey');
                    res.status(200).json({ token, userDetails });
                    // res.status(200).json({ token, payload });
                }

            }

        })
        .catch((err) => console.log(`Error login User: ${JSON.stringify(err, undefined, 2)}`));

});

router.get('/lastOrder/:id', (req, res) => {

    Order.aggregate([
        { "$match": { "customerId": ObjectID(req.params.id) } },
        {
            $group:
            {

                _id: "$customerId",
                maxDate: {
                    $max: "$orderDate"
                }
            }
        }
    ]).exec()
        .then((order) => {

            return Order.find({ customerId: req.params.id, orderDate: order[0].maxDate })
        })
        .then((order) => {

            res.json(order);
        })
        .catch((err) => {
            console.log(`Error get last order:${JSON.stringify(err, undefined, 2)}`)
            res.json("not found");

        });
});


router.put('/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    var newUser = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        street: req.body.street
    };
    User.findOneAndUpdate({ '_id': req.params.id }, { $set: newUser }, { new: true })
        .then((User) => {
            res.json(User);
            console.log('Update User succeeded')
        })
        .catch((err) => console.log(`Error update User: ${JSON.stringify(err, undefined, 2)}`));
});


router.delete('/:id', (req, res) => {
    if (!ObjectID(req.params.id)) {
        return res.status(400).send(`Error id: ${req.params.id}`);
    }

    User.findOneAndRemove({ '_id': req.params.id })
        .then((User) => {
            res.json(User);
            console.log('Delete User succeeded')
        })
        .catch((err) => console.log(`Error delete User: ${JSON.stringify(err, undefined, 2)}`));
});

module.exports = router;