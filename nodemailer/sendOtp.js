import {createTransport} from 'nodemailer'
import { userModel } from '../model/userModel.js';
let storeOtp; 
export const sentOTP = async (req,res)=>{


    try {
        const {email} = req.body
        const user = await userModel.findOne({email});
        if(user){
            return res.send({
                success:false,
                message:"user already exist"
            })
        }
        storeOtp = `${Math.floor(100000+Math.random()*900000)}`;


        const transpoter = createTransport({
            service:"gmail",
            
            auth:{
                user:`${process.env.USER_ID}`,
                pass:`${process.env.PASSWORD}`
            },
      
    
        })
    
        transpoter.sendMail({
    
            from:`vinay ${process.env.USER_ID}`,
            to:email,
            subject:'OTP-one time password',
            text:`Welcome to QuickChat.
            This is your one-time-passord OTP:${storeOtp}.
            This is valid only for Two minutes
            Enter the otp and enjoy  our service ,
            Thank you,
            Best regards,
            vinay kumar
            `
        },
        (error,info)=>{
            if(error){
                console.log('error in sending otp:: ',error);
             return res.send({
                    success:false,
                    message:'OTP could not be send, please try again'
                })

            }
            else{
                console.log(info);
               return res.send({
                    success:true,
                    message:'OTP sent successfully'
                })
            }
        })
        
    } catch (error) {
        console.log(`Error occur in sending otp with :: ${error}`);
        
    }


}
export const emaiVarification =async (req,res)=>{
    try {
        const {otp} = req.body
        if(!otp){
            return res.send({
                success:false,
                message:'Please enter otp'
            })
        }
        if(otp !== storeOtp){
            return res.send({
                success:false,
                message:'OTP not matched'
            })
        }

      return res.send({
        success:true,
        message:'otp Matched successully'
      })
        
    } catch (error) {
        console.log('error in otp varification :: ',error);
        return res.send({
            success:false,
            message:'Error in  server side'
        })
        
    }
}