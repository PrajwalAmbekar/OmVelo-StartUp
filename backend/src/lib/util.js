// import jwt from "jsonwebtoken";

// export const generateToken = (authId,res) =>{
//     const token = jwt.sign({authId},process.env.JWT_SECRET,{expiresIn:"7d"});
//     res.cookie("jwt",token ,{
//         maxAge:7*24*60*60*1000,
//         sameSite:"strict",
//     });
// }