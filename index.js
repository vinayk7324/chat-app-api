import express from 'express'
import { origin_url, port } from './conf.js'
import { connectDB } from './connection/dataBase.js';
import cors from 'cors'
import {router as authRoutes} from './router/authRoutes.js'
import  {Server} from 'socket.io';
import {router as messageRoutes} from './router/messagesRoutes.js'
import  http from "http"









const app = express();



//middileware
app.use(express.json());
app.use(cors(
{
    origin:[origin_url],
    
    credentials:true
}
    
));

//data base connection
connectDB();





//Routes


app.use('/api/v2/auth',authRoutes);
app.use('/api/v2/message',messageRoutes);
app.get('/socket.io/', (req, res) => {
  res.json({ message: 'CORS headers are set' });
});
app.get('/',(req,res)=>{
    res.send("Hello");

})

  const server = app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);

})


const io = new Server(server,{
    cors:{
        origin:[origin_url],
       credentials:true
    }
});
global.onlineUsers = new Map();
io.on('connection',(socket)=>{
    global.chatSocket = socket;
    console.log("user connected successfully");
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);


    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
      
       
        if(sendUserSocket){
          
   
            socket.to(sendUserSocket).emit("msg-recieve",data.message)

        }

    });

    
   

})
