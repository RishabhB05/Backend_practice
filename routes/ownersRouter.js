const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel")


if(process.env.NODE_ENV === "development"){
    router.post("/create" , async function(req , res){
        let owners = await ownerModel.find();
        if(owner.length > 0)
             res.send(503)
            .send("You dont have permission to create");

              
        //this is the else part where we can create owner    
        let {fullname, email, password} = req.body; 

        //this is where ownerModel which is the database will create a owner
        let createdOwner =  await ownerModel.create({
        fullname,
        email, 
        password, 
        });

        res.send(createdOwner);
        
    });
}

router.get("/admin" , function(req , res){
    let success = req.flash("success");
    res.render("createproducts", { success: success.length > 0 ? success[0] : "" });
})

module.exports = router; 