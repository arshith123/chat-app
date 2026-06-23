import React from 'react'

const StepbasicDetails = () => {
  return (
    <div className="w-full max-w-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Basic Details
        </h2>
        <p className="text-gray-500 mt-1">
          Enter your account information to get started.
        </p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        {/* Buttons */}
        <div className="pt-4">
          <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-lg transition cursor-pointer">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepbasicDetails;