import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import userauth from "../src/routes/deviceintegraion.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "../src/routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use(cookieParser());
app.use("/api/user_auth",userauth);
app.use("/api/auth",auth);

const port = process.env.PORT;

app.listen(port, () => {
    console.log("the server is running in port ", port);
    connectDb();
});
