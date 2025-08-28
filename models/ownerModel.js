const mongoose = require("mongoose");


const ownerSchema  = mongoose.Schema({
    fullname: {
        type:String, 
        trim:true,
    }, 
    password  : String, 
    email:String, 

    products:{
        type: Array, 
        default:[]
    }, 
    contact: Number, 
    picture: String
});

module.exports = mongoose.model("owner", ownerSchema);