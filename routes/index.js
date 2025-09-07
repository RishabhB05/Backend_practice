const express = require('express')
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

router.get('/' , function(req, res){
    let error = req.flash("error");
    res.render("index", { error: error , isLoggedIn:false });
});

router.get("/shop", isLoggedIn ,async function(req, res){
    let products = await productModel.find();
    res.render("shop", { products });
})

router.get("/addtocart/:id", isLoggedIn ,async function(req, res){

    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    res.redirect("/shop");
})

router.get("/cart", isLoggedIn ,async function(req, res){
    res.render("cart");
})




module.exports = router ; 
