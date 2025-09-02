const mongoose = require("mongoose");


const userSchema  = mongoose.Schema({
    fullname: {
        type:String, 
        trim:true,
    }, 
    password  : String, 
    email:String, 
    cart: {
        type: Array,
        default:[]
    },  
    orders:{
        type: Array, 
        default:[]
    }, 
    contact: Number, 
    picture: String
});

module.exports = mongoose.model("user", userSchema);