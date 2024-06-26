import { userModel } from "../model/userModel.js"
import { hashPassword, comparePassword } from '../helpers/authHelper.js'
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../conf.js'

export const RegisterController = async (req, res) => {

    try {
        const { name, email, password, agree } = req.body


        //validation
        const user = await userModel.findOne({ email });
        if (user) {
            return res.send({
                success: false,
                message: "User already exist"
            })
        }
        const hashedPassword = await hashPassword({ password });
        console.log(hashedPassword);

        const newUser = await userModel({
            name,
            email,
            password: hashedPassword,
            agree,


        }).save()

        //generating token 
        const token = jwt.sign({ _id: newUser._id }, JWT_KEY, {
            expiresIn: '10d'
        })

        if (newUser) {
            res.send({
                success: true,
                message: "user Register Successfully",
                userDetails: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    agree: newUser.agree,
                    isAvatarImageSet: newUser.isAvatarImageSet,
                    avatarImage: newUser.avatarImage
                },
                token: token
            },

            );
            return;
        }
    } catch (error) {
        console.log(`Error occuring in registering with :: ${error}`);

    }

}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email });
        if (!user) {
            res.send({
                success: false,
                message: "invalid username or password"
            })
            return;
        };

        
        
        const matchedPassword = await comparePassword({password,hashedPassword:user.password});
        const token = jwt.sign({ _id: user._id }, JWT_KEY, {
            expiresIn: '10d'
        })
        if (!matchedPassword) {
            return res.send({
                success: false,
                message: "incorrect password"
            })
        }
        else {

            return res.send({
                success: true,
                message: "Login successfully",
                userDetails: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAvatarImageSet: user.isAvatarImageSet,
                    avatarImage: user.avatarImage


                },
                token: token
            })
        }

    } catch (error) {
        res.send({
            success: false,
            message: 'error please wait'
        })
        console.log(`error occur in login :: ${error}`);
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email });
        if (!user) {
            res.send({
                success: false,
                message: 'user not found',
                
            })
        }
        else{
            res.send({success:true,message:"User Found",_id:user._id})

        }
       
    } catch (error) {
        console.log('forgot password controller::',error);
        res.send({success:false,message:"Server side error,Please wait"})
    }
};

export const updatePassword = async (req,res)=>{
    try {
        const {email,password} = req.body
      
        const user = await userModel.findOne({email});
        if(!user){
            res.status(404).send({
                success:false,
                message:"User not exist"
            })
        }
       
        const  hashedNewPassword = await hashPassword({ password });
       
     
          user.password = hashedNewPassword;
          await user.save();
          console.log(user.password);
        
            res.send({
                success:true,
                message:"Password Update successfully"
            })
        

    } catch (error) {
        console.log("updatePassword error ::",error);
        return res.send({success:false,message:"Error in server side please wait"});
        
        
        
    }

}


export const setAvatar = async (req, res) => {
    try {
        const userId = req.params.id
        console.log(userId);
        const { image } = req.body
        const userData = await userModel.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: image
        })
        res.send({
            success: true,
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        })

    } catch (error) {
        console.log('Error in  server side in avatar controller :: ', error);

    }
}

export const getAllUsers = async (req, res) => {

    try {
        const users = await userModel.find({ _id: { $ne: req.params.id } }).select([
            "name",
            "email",
            "isAvatarImageSet",
            "avatarImage",
            "_id",
            "lastMsg"

        ])
        if(users==[]){
            res.send({
                success:false,
                message:'No any contacts',
            })

            return;
        } else{  

        res.send({
            success:true,
            message:'all users',
            users

        })
    }


    } catch (error) {
        console.log(error);

    }
};
export const LogoutController =async(req,res)=>{
    try {
        res.serd({success:true,message:"LogOut  SuccessFully"})
    } catch (error) {
        console.log("Logout Controller::",error);
        
    }

}