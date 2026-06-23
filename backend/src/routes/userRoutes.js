import express from "express";
import { createOrUpdateUser, getUser, login } from "../controllers/userController.js";

const router = express.Router();

router.post("/create-update", createOrUpdateUser);
router.get("/:id", getUser);
router.post("/login", login);

export default router;
