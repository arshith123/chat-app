import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.use(errorHandler);

export default app;
