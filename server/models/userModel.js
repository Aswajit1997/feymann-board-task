import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "password must be greater than 5 char"],
  },
  topics: {
    type: [
      {
        title: { type: String, required: true, unique: true },
        description: {
          type: String,
          default: "some description about the topic",
        },
      },
    ],
    default:[]
  },
  
});

userSchema.pre('save',async function(next){
    // this.topics[0].description+=',hello i am added to the end'
    console.log(this.topics)
    next()
})

const userModel = mongoose.model("users", userSchema);

export default userModel;


// description:{
//     type:[

//     ]
// }
