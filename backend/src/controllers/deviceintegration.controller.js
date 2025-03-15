import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import Razorpay from "razorpay";
import user from "../models/user.model.js";
import user from "../models/user.model.js";




const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRECT
});



export const generateToken = async (req, res) => {
    try {
        const { mpin } = req.body;

        if (!mpin) {
            res.status(400).json("MPIN is required");
        }

        const token = jwt.sign({ mpin }, process.env.JWT_SECRET, { expiresIn: '15m' });
        await user.create({ mpin }, token);

        res.json({ token });

    } catch (error) {

        console.log("Error occured in generateToken", error.message);
        res.status(500).json("Internal Server Error");

    }
};
export const processPayment = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            res.status(400).json("Token required");
        }
        const options = {
            amount: 50000,
            currency: 'INR',
            receipt: 'order_rcptid_11',
        }
        const order = await razorpay.orders.create(options);
        res.json({ orderId: order.id });
    } catch (error) {
        console.log("Error occured in processPayment", error.message);
        res.status(500).json("Internal Server Error");
    }
}
export const verifyMPIN = async (req, res) => {
    try {
        const { token, mpin } = req.body;
        if (!token || !mpin) {
            res.status(400).json("Token and MPIN required");
        }
        const user = await user.finfOne({ token, mpin });
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