import mongoose from "mongoose";
import { DB_URL } from "../conf.js";
import colors from 'colors'


export const connectDB =async ()=>{
    try {

        const connect = await  mongoose.connect(DB_URL);
        console.log(`Database connect successfully with :: ${connect.connection.host}`.bgGreen);
        
    } catch (error) {
        console.log(`Error in connect Database with :: ${error}`.bgRed);

        
    }

}

