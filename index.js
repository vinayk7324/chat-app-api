import express from 'express'
import { port } from './conf.js'
import { connectDB } from './connection/dataBase.js';
import cors from 'cors'
import {router as authRoutes} from './router/authRoutes.js'
import { Socket,Server } from 'socket.io';
import {router as messageRoutes} from './router/messagesRoutes.js'







const app = express();


//middileware
app.use(express.json());
app.use(cors(
    {
        origin:["https://chat-app-fronted-2.vercel.app"],
        methods:["GET","POST","OPTIONS","DELETE"],
        credentials:true
    }
));

//data base connection
connectDB();


//uploading 


//Routes


app.use('/api/v2/auth',authRoutes);
app.use('/api/v2/message',messageRoutes);

app.get('/',(req,res)=>{
    res.send("Hello");

})

const server =  app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);

})

const io =  new Server(server,{
    cors:{
        origin:`http://localhost:5173`,
        credentials:true
    }
});

global.onlineUsers = new Map();
io.on('connection',(socket)=>{
    global.chatSocket = socket;
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
