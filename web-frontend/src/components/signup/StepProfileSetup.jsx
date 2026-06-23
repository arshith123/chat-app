import { ImagePlus, ArrowLeft } from "lucide-react";

const StepProfileSetup = () => {
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

      <div className="space-y-5">
        {/* Profile Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>

          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-sky-500 transition-colors">
              <div className="w-20 h-20 mx-auto rounded-full bg-sky-50 flex items-center justify-center mb-3">
                <ImagePlus size={28} className="text-sky-600" />
              </div>

              <p className="font-medium text-gray-700">
                Upload Profile Picture
              </p>

              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>

            <input type="file" className="hidden" />
          </label>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>

          <textarea
            rows={4}
            placeholder="Tell us a little about yourself..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700 font-medium">
              Skip
            </button>

            <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProfileSetup;