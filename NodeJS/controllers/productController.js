const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

var { Product } = require('../models/product');

router.get('/', (req, res) => {
    Product.find({})
        .exec()
        .then((Product) => {
            res.json(Product);
            console.log('get Products succeeded');
            console.log(req.params);
        })
        .catch((err) => console.log(`Error get Products:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/count', (req, res) => {
    Product.countDocuments({})
        .exec()
        .then((Product) => {
            res.json(Product);
        })
        .catch((err) => console.log(`Error get Products:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    Product.findById(req.params.id)
        .exec()
        .then((Product) => {
            res.json(Product);
            console.log('get Product succeeded');
        })
        .catch((err) => console.log(`Error get Product:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/name/:name', (req, res) => {

    Product.find({name:req.params.name})
        .exec()
        .then((Product) => {
          
            res.json(Product);
            console.log(req.params)
        })
        .catch((err) => console.log(`Error get Product:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/categoryId/:id', (req, res) => {

    Product.find({categoryId:req.params.id})
        .exec()
        .then((Product) => {
            res.json(Product);
            console.log(req.params)
        })
        .catch((err) => console.log(`Error get Product:${JSON.stringify(err, undefined, 2)}`));
});


router.post('/', (req, res) => {
    var newProduct = new Product({
        categoryId : req.body.categoryId, 
        name : req.body.name, 
        cost : req.body.cost, 
        url : req.body.url
    });
    newProduct.save()
        .then((Product) => {
            res.json(Product);
            console.log('post Product succeeded')
        })
        .catch((err) => console.log(`Error post Product: ${JSON.stringify(err, undefined, 2)}`));
});


router.put('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    var newProduct = {
        categoryId : req.body.categoryId, 
        name : req.body.name, 
        cost : req.body.cost, 
        url : req.body.url
    };
    Product.findOneAndUpdate({'_id':req.params.id}  , {$set : newProduct},{new:true})
        .then((Product) => {
            res.json(Product);
            console.log('Update Product succeeded')
        })
        .catch((err) => console.log(`Error update Product: ${JSON.stringify(err, undefined, 2)}`));
});


router.delete('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }

    Product.findOneAndRemove({'_id':req.params.id})
        .then((Product) => {
            res.json(Product);
            console.log('Delete Product succeeded')
        })
        .catch((err) => console.log(`Error delete Product: ${JSON.stringify(err, undefined, 2)}`));
});

module.exports = router;