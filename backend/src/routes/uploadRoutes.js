import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  uploadImageController,
  deleteImageController,
} from "../controllers/upload.controller.js";

const router = express.Router();

// POST /api/upload  — single image upload (field name: "image")
router.post("/", upload.single("image"), uploadImageController);

// DELETE /api/upload/:publicId  — delete image by Cloudinary public_id
// publicId may contain slashes (e.g. "uploads/abc123") — URL-encode them as %2F on the client
router.delete("/:publicId", deleteImageController);

export default router;
