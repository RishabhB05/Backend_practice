const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken")






module.exports.registerUser = async function(req, res){
  try{
      let { email , fullname , password} = req.body;
      //check whether user is alreayd present by checking username
     let user = await userModel.findOne({email: email})
     if(user) return res.status(401).send("You alreayd have an account");
     //else it will run this
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

module.exports.loginUser = async function(req , res){
   let {email , password} =  req.body;

   let user = await userModel.findOne({email: email});
   if(!user) return res.send("Email or password incorrect") ;

   // now we use bcrypt decreption to check if credential is correct
   //so if password match then it will give true else false
   //and even if true or false the function runs and take the value that is true or false in result variable
   bcrypt.compare(password, user.password , function(err , result){
       //if result is true
       if(result){
        //we already created generateToken so 
        //when res is true we generate token
         generateToken(user);
         res.cookie("token" , token);
         res.send("You logged in")
       }
       else{
        return res.send("email or password in incorrect")
       }
   })
}