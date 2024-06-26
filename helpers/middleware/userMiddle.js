import { JWT_KEY } from "../../conf.js"


export const userVerification = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const decoded = jwt.verify(token.split(' ')[1], JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(`ERROR IN USERMIDDLEWARE :: ${error}`);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}