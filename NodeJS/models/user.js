const mongoose = require('mongoose');



var User =mongoose.model('User',{ 
    // "id" : {type:Number},
    "firstName" : {type:String}, 
    "lastName" : {type:String}, 
    "email" : {type:String},
    "password" : {type:String},
    "city" : {type:String},
    "street" : {type:String},
    "role" : {type:String}
});

module.exports= {User};