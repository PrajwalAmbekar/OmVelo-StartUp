import bcrypt from "bcryptjs";
import Auth from "../models/auth.model.js";
import { generateToken } from "./deviceintegration.controller.js";

export const signup = async (req, res) => {
    console.log("Incoming Request Body:", req.body); // Debugging line

    const { fullName, password, email } = req.body;

    if (!fullName || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {
        const auth = await Auth.findOne({ email });
        if (auth) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAuth = new Auth({
            fullName,
            email,
            password: hashedPassword,
        });

        generateToken(newAuth._id, res);
        await newAuth.save();
        return res.status(201).json({ message: "Signup successful", user: newAuth });

    } catch (error) {
        console.log("Error in Signup:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const {email,password}= req.body;
    try {
        const auth = await Auth.findOne({email});
        if (!auth) {
            return res.status(400).json("Invalid credentials");
        }
        const isPasswordCorrect = await bcrypt.compare(password, auth.password);
        if (!isPasswordCorrect) {
            return res.status(400).json("Invalid credentials");
        }
        
        generateToken(auth._id,res);


        
    } catch (error) {console.log("Error occured in login page",error.message);
        res.status(500).json("Internal Server error");
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json("Logout Successfully");
    } catch (error) {
        console.log("Error occured in logout page",error.message);
        res.status(500).json("Internal Server error");
    }

}
