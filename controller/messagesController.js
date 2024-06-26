import { messagesModel } from "../model/messageModel.js";
import { userModel } from "../model/userModel.js";

const sendMessage = async(req,res)=>{
    try {
        const {from,to,message} = req.body
        const data = await messagesModel.create({
            message:{text:message},
            users:[from,to],
            sender:from
        })
        if(!data){
            return res.send({
                success:false,
                message:"error in adding message to dB"
            })
        };
        const resMsg = await userModel.findByIdAndUpdate(to,{
            lastMsg:[{id:from,msg:message}]
        });
        res.send({success:true,
            message:"message send successfully"
        });
        
    } catch (error) {
        console.log('server side error in sending message :: ',error);
        
    }

}
const getAllMessage =async (req,res)=>{
    try {
        const {from,to} = req.body
        const messages = await messagesModel.find({
            users:{
                $all:[from,to],
            },
        }).sort({updatedAt:1});
        const projectedMessages = messages.map((msg)=>{
           
            return {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text,
                
            }
        })

        return res.send(projectedMessages)
        
    } catch (error) {
        console.log('error in getting all msg::',error);
        
    }

}


export {sendMessage,getAllMessage};