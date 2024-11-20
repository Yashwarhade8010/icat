const { Router } = require("express");
const router = Router();
const {handleUserSignup,handleUserSignin} = require("../controller/userController");

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get("/signin",(req,res)=>{
    res.render("login")
})

router.post("/signup",handleUserSignup);

router.post("/signin",handleUserSignin);

module.exports = router;