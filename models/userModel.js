const mongoose = require("mongoose");


const userSchema  = mongoose.Schema({
    fullname: {
        type:String, 
        trim:true,
    }, 
    password  : String, 
    email:String, 
    cart: [{
        //this is where product id is stored
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],  
    orders:{
        type: Array, 
        default:[]
    }, 
    contact: Number, 
    picture: String
});

module.exports = mongoose.model("user", userSchema);