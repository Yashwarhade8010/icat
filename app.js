const express = require("express");
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const userRoute = require("./routes/userRoutes");
const mongoose = require("mongoose");
const User = require("./models/user");
const {connectDB} =require("./connection");
const {checkAuth,restrict} = require("./middleware/checkAuth")
const cookieParser = require('cookie-parser')

const app = express()
connectDB();
app.use(cookieParser());
app.use(checkAuth('uid'));
const server = createServer(app);
const io = new Server(server);
const PORT = 4000

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set("views",'views')
const socketConnected = new Set();

io.on('connection',onconnected);

function onconnected(socket){
  
  socketConnected.add(socket.id)
  io.emit('total-client',socketConnected.size)

  socket.on("disconnect",()=>{
    console.log('socket disconnected',socket.id)
    socketConnected.delete(socket.id) 
    io.emit('total-client',socketConnected.size)
  })

  socket.on('message',(data)=>{
    
    socket.broadcast.emit("chat-message",data);
  })
}


app.use("/ichat",restrict());
app.get("/ichat",(req,res)=>{
  res.render('index',{
    user:req.user
  });  
})

app.use("/user",userRoute);

server.listen(PORT,()=>console.log("server started at port: "+PORT));
