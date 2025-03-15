import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    mpin:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    }
},{timestamps:true}
);

const User=mongoose.model('User',userSchema);

export default User;