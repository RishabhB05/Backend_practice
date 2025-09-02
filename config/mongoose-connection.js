const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");
const config = require("config");


mongoose.connect(`${config.get("MONGODB_URI")}/RBbuys`)
.then(function(){
    dbgr("connected");
    console.log("Mongoose connected successfully");
}).catch(function(err){
    dbgr(err);
})


mongoose.export = mongoose.connection ;