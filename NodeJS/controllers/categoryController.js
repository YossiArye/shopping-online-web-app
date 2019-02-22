const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

var { Category } = require('../models/category');

router.get('/', (req, res) => {
    Category.find({})
        .exec()
        .then((Category) => {
            res.json(Category);
            console.log('get Categorys succeeded')
        })
        .catch((err) => console.log(`Error get Categorys:${JSON.stringify(err, undefined, 2)}`));
});

router.get('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    Category.findById(req.params.id)
        .exec()
        .then((Category) => {
            res.json(Category);
            console.log('get Category succeeded')
        })
        .catch((err) => console.log(`Error get Category:${JSON.stringify(err, undefined, 2)}`));
});


router.post('/', (req, res) => {
    var newCategory = new Category({
        name :  req.body.name
    });
    newCategory.save()
        .then((Category) => {
            res.json(Category);
            console.log('post Category succeeded')
        })
        .catch((err) => console.log(`Error post Category: ${JSON.stringify(err, undefined, 2)}`));
});


router.put('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }
    var newCategory = {
        name :  req.body.name
    };
    Category.findOneAndUpdate({'_id':req.params.id}  , {$set : newCategory},{new:true})
        .then((Category) => {
            res.json(Category);
            console.log('Update Category succeeded')
        })
        .catch((err) => console.log(`Error update Category: ${JSON.stringify(err, undefined, 2)}`));
});


router.delete('/:id', (req, res) => {
    if(!ObjectID(req.params.id)){
        return res.status(400).send(`Error id: ${req.params.id}`);
    }

    Category.findOneAndRemove({'_id':req.params.id})
        .then((Category) => {
            res.json(Category);
            console.log('Delete Category succeeded')
        })
        .catch((err) => console.log(`Error delete Category: ${JSON.stringify(err, undefined, 2)}`));
});

module.exports = router;