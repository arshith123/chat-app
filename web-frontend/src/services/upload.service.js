import { apiRequest } from "./api";
import { API_ENDPOINTS } from "../constants/apiEnpoints";
import { UPLOAD_FOLDERS } from "../constants/config";

/**
 * Upload an image to Cloudinary via the backend upload endpoint.
 * @param {File} file - The file object to upload.
 * @param {string} [folder=UPLOAD_FOLDERS.PROFILE] - Destination folder in Cloudinary.
 * @returns {Promise<{ success: boolean, url: string, publicId: string }>}
 */
export const uploadImage = async (file, folder = UPLOAD_FOLDERS.PROFILE) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  return await apiRequest(API_ENDPOINTS.UPLOAD, {
    method: "POST",
    body: formData,
  });
};

/**
 * Delete an image from Cloudinary via the backend upload endpoint using its public ID.
 * @param {string} publicId - The Cloudinary public_id of the image to delete.
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const deleteImage = async (publicId) => {
  // Ensure the publicId is URL-encoded as it can contain slashes (e.g. "uploads/filename")
  const encodedPublicId = encodeURIComponent(publicId);
  return await apiRequest(`${API_ENDPOINTS.UPLOAD}/${encodedPublicId}`, {
    method: "DELETE",
  });
};
