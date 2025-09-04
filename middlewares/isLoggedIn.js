const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
//this middleware will use to varify if the token is correct and if its present
module.exports = async function(req, res ,next){
    if(!req.cookies.token){
        req.flash("error", "You need to login first ");
        res.redirect("/");
    }
    else{
        try{
          let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
          let user = await userModel.findOne({email: decode.email}).select("-password");

          req.user = user; 
          next();
        }catch(err){
            req.flash("error" , "something went wrong"); 
            res.redirect("/");
        }
    }
 }