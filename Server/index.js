import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/Users.js';
import videoRoutes from './routes/Videos.js'
import commentRoutes from './routes/Comments.js'
import authRoutes from './routes/auth.js'

const app = express();

dotenv.config();

const connect=() =>{
    mongoose.connect(`mongodb+srv://rutujadhekolkar97:rutujadhekolkar97@cluster0.fxzr3ix.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
        console.log("Connected to Server");
    })
    .catch((err)=>{
        throw err;
    })
}

app.use(cookieParser())
app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!"
    return res.status(status).json({
        success:false,
        status:status,
        message:message
    })
})
app.listen(8080,()=>{
    connect();
    console.log('server is running localhost')
})