import mongoose from "mongoose";
import logger from "./logger.js";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error({ err }, "MongoDB connection failed");
    process.exit(1);
  }
};

export default connectDb;
