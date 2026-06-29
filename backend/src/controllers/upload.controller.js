import { uploadImage, deleteImage } from "../utils/cloudinary.util.js";

/**
 * POST /api/upload
 * Expects: multipart/form-data with field "image" and optional body field "folder".
 * The multer upload middleware must be applied on the route before this controller.
 */
const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const folder = req.body.folder || "uploads";
    const result = await uploadImage(req.file.buffer, folder);

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: err.message,
    });
  }
};

/**
 * DELETE /api/upload/:publicId
 * Deletes an image from Cloudinary by its publicId (URL-encoded).
 */
const deleteImageController = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "publicId is required",
      });
    }

    // publicId may contain slashes (e.g. "uploads/abc123"), decode it
    const decodedPublicId = decodeURIComponent(publicId);
    const result = await deleteImage(decodedPublicId);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      result,
    });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({
      success: false,
      message: "Image deletion failed",
      error: err.message,
    });
  }
};

export { uploadImageController, deleteImageController };
