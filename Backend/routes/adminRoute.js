import express from 'express'
import { register , login, logout } from '../controllers/adminController.js';
import Auth from '../middleware/authMiddleware.js';
const authroutes= express.Router();

authroutes.post('/register',register);
authroutes.post('/login',login);
authroutes.post('/logout',logout);

// protected Route
authroutes.get('/dashboard', Auth, (req,res)=>{
    res.json({message:"Access Granted"});
})

export default authroutes;