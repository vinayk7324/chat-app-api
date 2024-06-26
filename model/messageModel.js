import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message:{
        text:{
            type:String,
            required:true
        },
        
    },
    users:Array,
    sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    


},{
    timestamps:true
}
);

export const messagesModel = mongoose.model("Messages",messageSchema);
