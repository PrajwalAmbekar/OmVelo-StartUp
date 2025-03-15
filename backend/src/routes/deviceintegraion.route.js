import express from "express";
import { generateToken, processPayment, unlockProduct, verifyMPIN } from "../controllers/deviceintegration.controller.js";


const route=express.Router();

route.post("/generate-token",generateToken);
route.post("/process-payment",processPayment)
route.post("/verify-mpin",verifyMPIN);
route.post("/unlock",unlockProduct);

export default route;