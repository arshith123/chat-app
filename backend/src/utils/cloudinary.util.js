import cloudinary from "../config/cloudinary.js";

/**
 * Upload an image buffer to Cloudinary.
 * @param {Buffer} buffer - The image buffer from multer memoryStorage.
 * @param {string} folder  - Cloudinary folder to upload into (default: "uploads").
 * @returns {Promise<object>} Cloudinary upload result (secure_url, public_id, …)
 */
const uploadImage = (buffer, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    stream.end(buffer);
  });
};

/**
 * Delete an image from Cloudinary by its public_id.
 * @param {string} publicId - The Cloudinary public_id of the image.
 * @returns {Promise<object>} Cloudinary deletion result.
 */
const deleteImage = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

export { uploadImage, deleteImage };
