const bcrypt = require("bcrypt");
const User = require("../models/user");
const {signUser, verifyUser} = require("../middleware/authentication");

async function handleUserSignup(req,res){
    const {username,typePasswordX} = req.body;
    console.log(username,typePasswordX)
    const hashedPassword = await bcrypt.hash(typePasswordX,(await bcrypt.genSalt(16)).toString());
    console.log(hashedPassword);
   
    try{
        const user = new User({
            username,
            password:hashedPassword
        })
        await user.save();
        return res.redirect("/user/signin");
    }catch(error){
        res.render("signup",{error:"Failed to register"});
        console.log(error)
    }
}

async function handleUserSignin(req,res,next){
    const {username,password} = req.body;
    
    try{
        const user = await User.findOne({username});
        const result = await bcrypt.compare(password,user.password);
        console.log(result);
        if(result==true){
            const token = signUser(user);
            res.cookie('uid',token);
            return res.redirect("/ichat");
        }
        
        next();

    }catch(error){
        console.log(error)
        res.render("login",{error:"Wrong username or password"})
    }
}

module.exports={
    handleUserSignup,
    handleUserSignin
}