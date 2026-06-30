import express from "express";
import { createOrUpdateUser, getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-update", createOrUpdateUser);
router.get("/:id", getUser);

export default router;
