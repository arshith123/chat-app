import "dotenv/config";
import express from "express";
import app from "./src/app.js"
import connectDb from "./src/config/db.js";
import logger from "./src/config/logger.js";

const PORT = process.env.PORT || 3000;

await connectDb()

app.get("/",(req,res) =>{
    res.send("API running");
})

app.listen(PORT,() => {
    logger.info(`Server running on port http://localhost:${PORT}`);
})