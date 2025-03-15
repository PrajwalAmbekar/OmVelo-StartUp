import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    mpin:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    }
},{timestamp:true}
);

const user=mongoose.model('User',userSchema);

export default user;