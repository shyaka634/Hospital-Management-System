import express from 'express';
import connectDb from './config/db.js';
import authroutes from './routes/adminRoute.js';
import departmentroute from './routes/departmentRoute.js';
import postroute from './routes/postRoute.js';
import staffroute from './routes/staffRoute.js';
import recruitmentroutes from './routes/recruitmentRoute.js';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
const app= express();
dotenv.config();
connectDb();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
}));

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET || 'my secret key',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        sameSite:'lax'
    }
}))
app.use('/api/auth',authroutes)
app.use('/api/department',departmentroute)
app.use('/api/post',postroute)
app.use('/api/staff',staffroute)
app.use('/api/recruitment',recruitmentroutes)
app.listen(process.env.PORT, ()=>{
    console.log(`Listerning to Port ${process.env.PORT}`)
});