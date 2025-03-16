import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import Razorpay from "razorpay";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


console.log("Key ID:", process.env.RAZORPAY_KEY_ID || "Not Found");
console.log("Key Secret:", process.env.RAZORPAY_KEY_SECRET || "Not Found");





export const generateToken = async (req, res) => {
    try {
        const { mpin } = req.body;

        if (!mpin) {
            res.status(400).json("MPIN is required");
        }

        const token = jwt.sign({ mpin }, process.env.JWT_SECRET, { expiresIn: '15m' });
        await user.create({ mpin , token});

        res.json({ token });

    } catch (error) {

        console.log("Error occured in generateToken", error.message);
        res.status(500).json("Internal Server Error");

    }
};
export const processPayment = async (req, res) => {
    try {
        
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token is required" });
        }

      
        const token = authHeader.split(" ")[1];

       
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        req.user = decoded; 

        
        const { amount } = req.body;
        if (!amount) return res.status(400).json({ error: "Amount is required" });

       
        const order = await razorpay.orders.create({
            amount: amount * 100, 
            currency: "INR",
            payment_capture: 1, 
        });

        res.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error("Razorpay Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const verifyMPIN = async (req, res) => {
    try {
        const { token, mpin } = req.body;
        if (!token || !mpin) {
            res.status(400).json("Token and MPIN required");
        }
        const user = await User.findOne({ token, mpin });
        if (!user) {
            res.status(400).json("Invalid MPIN");
        }
        res.json("MPIN Verified");
    } catch (error) {
        console.log("Error occured in verifyMPIN", error.message);
        res.status(500).json("Internal Server Error");
    }

}
export const unlockProduct=async (req,res)=>{
    try {
        const {token}=req.body;
        if(!token){
            res.status(400).json("Token required");
        }
        const user=await user.finfOne({token});
        if(!user){
            res.status(401).json("Unauthorized");
        }
        res.json("Product Unlocked");
    } catch (error) {
        console.log("Error occured in unlockProduct".error.message);
        res.status(500).json("Internal Server Error");
    }

}





