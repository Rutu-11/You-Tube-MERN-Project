import Video from "../Models/Video.js";
import User from "../Models/User.js"
import { createError } from "../error.js";



export const addVideo = async(req, res, next)=>{
    const newVideo = new Video({userId:req.user.id, ...req.body});
    try{
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
    }
    catch(err){
        next(err)
    }
}

export const updateVideo = async(req, res, next)=>{
    // const newVideo = new Video({userId:req.user.id, ...req.body});
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return nexxt(createError(404, "Video Not Found!"));
        if(req.user.id == video.userId){
            const updateVideo = await Video.findByIdAndUpdate(req.params.id,{set:req.body}, {new:true});
            res.status(200).json(updateVideo)
        }
        else{
            return next(createError(403, "you can update only your video"))
        }
    }
    catch(err){
        next(err)
    }
}

export const deleteVideo = async(req, res, next)=>{
    try{
        const video = await Video.findById(req.params.id);
        if(!video) return nexxt(createError(404, "Video Not Found!"));
        if(req.user.id == video.userId){
          await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted")
        }
        else{
            return next(createError(403, "you can Delete only your video"))
        }
    }
    catch(err){
        next(err)
    }
}

export const getVideo = async(req, res, next)=>{
    // const newVideo = new Video({userId:req.user.id, ...req.body});
    try{
        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
    }
    catch(err){
        next(err)
    }
}

export const addView = async(req, res, next)=>{
   
    try{
        await Video.findByIdAndUpdate(req.params.id,{$inc:{views:1}});
        res.status(200).json("Views has been increased")
    }
    catch(err){
        next(err)
    }
}

export const random = async(req, res, next)=>{
    // const newVideo = new Video({userId:req.user.id, ...req.body});
    try{
        const video = await Video.aggregate([]);
        res.status(200).json(video)
    }
    catch(err){
        next(err)
    }
}

export const trends = async(req, res, next)=>{
    // const newVideo = new Video({userId:req.user.id, ...req.body});
    try{
        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
    }
    catch(err){
        next(err)
    }
}

export const subscribes = async(req, res, next)=>{
    // const newVideo = new Video({userId:req.user.id, ...req.body});
    try{
        const user = await User.findById(req.params.id);
        const subscribedChannels = User.SubscribedUsers;

        const list = Promise.all(
            subscribedChannels.map((channelId)=>{
                return  Video.find({userId: channelId})
            })
        )
        res.status(200).json(list)
    }
    catch(err){
        next(err)
    }
}