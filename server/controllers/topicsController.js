import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const addTopic=asyncHandler(async(req,res)=>{
    console.log(req.params)
    console.log(req.body)
    const {_id}=req.params;
    if(!_id) {
        res.status(500)
        throw new Error("topics must have a user id")
    }
    //find the user who wants to add topic
    const user=await User.findById({_id})
    if(!user) {
        res.status(400)
        throw new Error('user not found')
    }
    //adding new topic to user's topic list
    const {title,description}=req.body
    if(!title | !description){
        res.status(400)
        throw new Error("please enter user title and description")
    }
    user.topics.push({title,description})
    console.log(user)
    const updatedUser=await user.save()

    res.status(201).json({
        status:"success",
        data:updatedUser
    })
    
})
const usersTopic=asyncHandler(async(req,res)=>{
    console.log(req.params)
    const {_id}=req.params;
    if(!_id) {
        res.status(500)
        throw new Error("topics must have a user id")
    }
    //find the user who wants to add topic
    const user=await User.findById({_id})
    if(!user) {
        res.status(400)
        throw new Error('user not found')
    }
    console.log(user)
    res.status(200).json({
        status:"success",
        usersTopic:user.topics
    })
})

export {addTopic,usersTopic}