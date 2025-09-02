const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken")






const registerUser = function(req, res){
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

               let token = generateToken(createdUser); 
               res.cookie("token", token); 

                res.status(201).json({
                message: "User registered successfully",
                user: { id: createdUser._id, email: createdUser.email }
             }); 
             
            }
          });
        });
     
  }catch(err){
        console.log(err.message);
  }

}

module.exports.registerUser = registerUser;
