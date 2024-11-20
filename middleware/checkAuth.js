const {verifyUser} = require("./authentication")

function checkAuth(cookieName){
    return (req,res,next)=>{
        const tokenValue = req.cookies[cookieName];
        
        if(!tokenValue){
            return next();
        }
        try{
            const userPayload = verifyUser(tokenValue);
            req.user = userPayload;
            next();
           
        }catch(error){
            console.log(error)
            
        }
        next()
    }
 }

 function restrict(){
    return (req,res)=>{
        if(!req.user) return res.redirect("/user/signin");
  
    }
    
 }

module.exports = {
    checkAuth,
    restrict
}