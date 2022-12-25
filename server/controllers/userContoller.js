import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const allUsers = async (req, res) => {
  let users = await User.find({});
  if (users) {
    res.status(200).json({
      status: "sucess",
      length: users.length,
      users,
    });
  } else {
    res.status(500);
    throw new Error("failed to load users");
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username, password ,topics} = req.body;
  console.log(req.body)
  //validation
  if (!username | !password) {
    res.status(400);
    throw new Error("Please fill in all required field");
  }
  //checking if user is already registered
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("username already been taken");
  }

  //create a newuser
  const newUser=await User.create({username,password,topics})
  if(newUser){
    res.status(201).json({
        status:"Success",
        userData:newUser
    })
  }else {
    res.status(500)
    throw new Error("user creation failed try again")
  }

});

const getUser=asyncHandler(async(req,res)=>{
  console.log(req.params)
  //checking  for user availability
  const userExist=await User.findById(req.params)
  if(!userExist){
    res.status(400)
    throw new Error("user doesn't exists plz register")
  }
  else{
    res.status(200).json({
      status:'success',
      user:userExist
    })
  }
})

export {getUser,registerUser,allUsers}