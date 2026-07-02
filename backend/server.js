import express from "express";
import dotenv from "dotenv";
import app from "./src/app.js"
import connectDb from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

await connectDb()

app.get("/",(req,res) =>{
    res.send("API running");
})

app.listen(PORT,() => {
    console.log(`server running on port http://localhost:${PORT}`);
})