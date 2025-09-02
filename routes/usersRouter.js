const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


router.get("/" , function(req , res){
    res.send("hey");
})

router.post('/register' , function(req, res){
  try{
      let { email , fullname , password} = req.body;
       
      bcrypt.genSalt(10 , function(err, salt){
          bcrypt.hash(password, salt , async function(err  ,hash){
            if(err) return res.send(err.message);
            else{
            let createdUser = await userModel.create({
              email, 
              fullname , 
              password: hash, 
               })
               res.send(createdUser);
            }
          });
        });
     
  }catch(err){
        console.log(err.message);
  }

})

module.exports = router; 