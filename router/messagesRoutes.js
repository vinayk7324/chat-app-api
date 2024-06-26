import express from 'express'
import { getAllMessage, sendMessage } from '../controller/messagesController.js';
const router = express.Router();

router.post('/send-message',sendMessage);
router.post('/get-message',getAllMessage);

export {router}