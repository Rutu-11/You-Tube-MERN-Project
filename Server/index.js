import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import userRoutes from './routes/Users.js';
import videoRoutes from './routes/Videos.js'
import commentRoutes from './routes/Comments.js'
import authRoutes from './routes/auth.js'

const app = express();

dotenv.config();

const connect=() =>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to Server");
    })
    .catch((err)=>{
        throw err;
    })
}

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