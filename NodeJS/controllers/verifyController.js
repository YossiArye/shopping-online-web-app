const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization;
  if (token === "null") {
    return res.status(401).send('Unauthorized request')
  }

  try {
    jwt.verify(token, 'secretCustomerKey')
    next();
  }
  catch (err) {
    jwt.verify(token, 'secretAdminKey')
    next();
  }



}

function verifyAdminToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization;
  if (token === "null") {
    return res.status(401).send('Unauthorized request')
  }

  try{
    jwt.verify(token, 'secretAdminKey');
    next();
  }
  catch(err){
    res.json("customer");
  }
  
}


router.get('/shopping', verifyToken, (req, res) => {

  res.json("");
})

router.get('/adminOrCustomer', verifyAdminToken, (req, res) => {
  res.json("admin");
})


module.exports = router; 