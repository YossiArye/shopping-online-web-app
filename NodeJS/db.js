const mongoose = require('mongoose');


mongoose.Promise=global.Promise;
// mongodb://YossiArye:Yossi4164@ds145412.mlab.com:45412/shopping-online
// mongodb://localhost:27017/shopping
mongoose.connect('mongodb://localhost:27017/shopping' ,{ useNewUrlParser: true })
.then(()=>console.log("mongodb connection succeeded"))
.catch((err)=>console.log(`error in db connection ${JSON.stringify(err,undefined,2)}`));    

module.exports=mongoose;