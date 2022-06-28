const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
const {addUser,getUser,leftUser,getUserByID}=require("./user")
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("server started up");
// });

io.on("connection", (socket) => {
  console.log("user connected " + socket.id);
  socket.on("join-room", (name, room,callback) => {
      const {error,users}=addUser({id:socket.id,name,room});
      if(error){
        console.log(error);
        return callback(error);
      }
      else{
        socket.join(room);
        socket.emit("Welcome",{Text:` Welcome to room ${name} `})
        socket.broadcast.to(room).emit("user-joined", { Text:`${name} has joined `, });
        io.to(room).emit("specificRoomData",{usersList:getUser(room)})
      }
  });

  socket.on("sendMessage",(data)=>{
    const user=getUserByID(socket.id);
    console.log(data.sentMessage);
    socket.to(user.room).emit("receiveMsg",{Text:data.sentMessage,User:user})
  
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user=leftUser(socket.id);
    if(user){
      io.to(user.room).emit("left",{Text:`${user.name} has left chat`,})
      io.to(user.room).emit("specificRoomData",{usersList:getUser(user.room)})
    }
  });
});


server.listen(process.env.PORT || 8001, () => {
  console.log("server started");
});