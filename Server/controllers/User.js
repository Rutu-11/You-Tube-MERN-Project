import { createError } from "../error.js"
import User from "../Models/User.js"

export const update = async(req, res, next)=>{
    if(req.params.id === req.user.id){

        try{
                let updatedUser = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                },
                {new:true}
                )
                res.status(200).json(updatedUser)
        }
        
        catch(e){
            next(e)
        }
    }
    else{
        return next(createError(403, "You can update only your account"))
        // return "somethin went wrong"
    }
}
export const deleteUser = async(req, res, next)=>{
    if(req.params.id === req.user.id){

        try{
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted")
        }
        
        catch(e){
            next(e)
        }
    }
    else{
        return next(createError(403, "You can delete only your account"))
        // return "somethin went wrong"
    }
}
export const getUser = async(req, res, next)=>{
    try{
            const user = await User.findById(req.params.id);
            res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}
export const subscribe = async(req, res, next)=>{
    try{
        await User.findById(req.user.id,{ $push:{SubscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{ $inc:{subscribers:1}
        })
        res.status(200).json("Subscription Sucessfull.")
    }
    catch(err){
        next(err)
    }
}
export const unSubscribe = async(req, res, next)=>{
    try{
        await User.findById(req.user.id,{ $pull:{SubscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{ $inc:{subscribers:-1}
        })
        res.status(200).json("Unsubscription Sucessfull.")
    }
    catch(err){
        next(err)
    }
}
export const like = async(req, res, next)=>{
    try{

    }
    catch(err){
        next(err)
    }
}
export const dislike = async(req, res, next)=>{
    try{

    }
    catch(err){
        next(err)
    }
}
