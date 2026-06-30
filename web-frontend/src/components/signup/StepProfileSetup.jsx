import React, { useState, useEffect } from "react";
import { ImagePlus, ArrowLeft } from "lucide-react";
import { register } from "@/services/auth.service";
import { uploadImage } from "@/services/upload.service";

const StepProfileSetup = ({ user, onComplete, onBack }) => {
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clean up preview object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file (PNG, JPG)");
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setImageFile(file);
      setError("");

      // Revoke the old object URL if it exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (submitData = true) => {
    setLoading(true);
    setError("");

    try {
      if (submitData) {
        let avatarUrl = "";
        let avatarPublicId = "";

        // 1. Upload profile image to Cloudinary if selected
        if (imageFile) {
          const uploadRes = await uploadImage(imageFile);
          if (uploadRes.success) {
            avatarUrl = uploadRes.url;
            avatarPublicId = uploadRes.publicId;
          } else {
            throw new Error("Failed to upload profile picture");
          }
        }

        // 2. Call backend /users/create-update to update the user with profile details
        // Note: we pass user._id so the backend updates the correct record
        await register({
          _id: user._id,
          avatar: avatarUrl,
          avatar_public_id: avatarPublicId,
          bio: bio.trim(),
        });
      }
      onComplete();
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Profile Setup
        </h2>
        <p className="text-gray-500 mt-1">
          Add a profile picture and tell others a little about yourself.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Profile Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>

          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-sky-500 transition-colors flex flex-col items-center justify-center">
              {previewUrl ? (
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-sky-500 relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImagePlus size={20} className="text-white" />
                  </div>
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full bg-sky-50 flex items-center justify-center mb-3">
                  <ImagePlus size={28} className="text-sky-600" />
                </div>
              )}

              <p className="font-medium text-gray-700">
                {previewUrl ? "Change Profile Picture" : "Upload Profile Picture"}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>

          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={loading}
            placeholder="Tell us a little about yourself..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onBack}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 cursor-pointer disabled:opacity-50"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSave(false)}
              disabled={loading}
              className="text-gray-500 hover:text-gray-700 font-medium cursor-pointer disabled:opacity-50"
            >
              Skip
            </button>

            <button
              onClick={() => handleSave(true)}
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer disabled:bg-sky-400"
            >
              {loading ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProfileSetup;