import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/connection.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imageRoute.js';
const Port=process.env.Port || 4000
const app=express();


// middlewares
app.use(express.json());
app.use(cors());

// Mongodb connection
connectDB();

// Test api
app.get('/',(req,res)=>{
    res.send("Api working")
})

// Api
app.use('/api/user',userRouter);
app.use('/api/image',imageRouter)


app.listen(Port,()=> console.log("Server Started at " + Port))