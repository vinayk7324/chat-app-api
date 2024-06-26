import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    agree:{
        type:Boolean,
        required:true
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:''
    },
    lastMsg:Array
    
    
    

},{timestamps:true});

export const userModel = new mongoose.model("user",userSchema);