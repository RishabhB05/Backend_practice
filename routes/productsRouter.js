const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/productModel");



// POST create product
router.post("/create", upload.single("image"), async function(req, res) {
 try{
     let {image ,name , price , discount , bgcolor , panelcolor , textcolor} = req.body;
   
    let product = await productModel.create({
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
        image: req.file ? req.file.buffer : null
    });
    req.flash("success", "Product created successfully");
   res.redirect(`/owners/admin`);
 }catch(err){
    console.log(err);
    res.status(500).send("Internal server error");
 }

  
});

module.exports = router;