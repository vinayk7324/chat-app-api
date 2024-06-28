import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT
const DB_URL = process.env.DB_URL
const JWT_KEY = process.env.JWT_KEY
const origin_url = process.env.ORIGIN




export { port,DB_URL ,JWT_KEY,origin_url};