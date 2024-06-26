import express from 'express'
import { LogoutController, RegisterController,forgotPassword,getAllUsers,loginController, setAvatar, updatePassword } from '../controller/authController.js';
import { userVerification } from '../helpers/middleware/userMiddle.js';
import {emaiVarification,sentOTP} from '../nodemailer/sendOtp.js'

const router = express.Router();

router.post('/register',RegisterController);
router.post('/send-otp',sentOTP)
router.post('/email-varification',emaiVarification);
router.post('/login',loginController);
router.post('/setAvatar/:id',setAvatar);
router.get('/getAllUsers/:id',getAllUsers);
router.post('/logout',userVerification,LogoutController);
router.post('/forgot-password',forgotPassword);
router.post('/update-password',updatePassword);
//protected root for user
router.route('/user-auth').get(userVerification,(req,res)=>{
    res.status(200).send({
        ok:true

    })

})
export {router}