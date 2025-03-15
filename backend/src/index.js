import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import userauth from "../src/routes/deviceintegraion.route.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user_auth",userauth)

const port = process.env.PORT;

app.listen(port, () => {
    console.log("the server is running in port ", port);
    connectDb();
});
