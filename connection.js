const mongoose = require("mongoose");
const User = require("./models/user");

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://yashwarhade8:2z7uwk1tMtybPqQb@ichat.dsdpf.mongodb.net/ichat");
        console.log(`db connected successfully:${mongoose.connection.host}`);
    }catch(error){
        console.log("error:"+error)
    }
    
}

module.exports ={
    connectDB
}