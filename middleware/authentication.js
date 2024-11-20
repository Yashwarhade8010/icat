const jwt = require("jsonwebtoken");
const secret = "yash";

function signUser(user){
    const token = jwt.sign({
        "username":user.username,
        "id":user._id
    },secret);

    return token;
};

function verifyUser(token){
    try{
        return jwt.verify(token,secret)
    }catch(error){
        return null;
    }
    
}

module.exports={
    signUser,
    verifyUser
}