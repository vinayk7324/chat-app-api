import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT
const DB_URL = process.env.DB_URL
const JWT_KEY = process.env.JWT_KEY




export { port,DB_URL ,JWT_KEY};