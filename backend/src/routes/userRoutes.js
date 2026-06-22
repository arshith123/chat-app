import express from "express";
import { createOrUpdateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-update", createOrUpdateUser);

export default router;
