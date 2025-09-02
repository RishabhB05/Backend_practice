const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/authController")


router.get("/" , function(req , res){
    res.send("hey its working fine");
})

router.post('/register',registerUser )

module.exports = router; 