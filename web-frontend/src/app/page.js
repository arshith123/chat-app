import { MessageCircle, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="h-screen grid grid-cols-2">
      {/* Left Section */}
      <div className="bg-sky-600 flex flex-col justify-center px-16 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to ChatApp
        </h1>

        <p className="text-lg text-sky-100 mb-10 max-w-md leading-relaxed">
          Connect instantly with friends, family, and colleagues.
          Enjoy seamless communication with real-time messaging and
          secure conversations.
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <MessageCircle size={24} />
            <span className="text-lg">Real-time messaging</span>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck size={24} />
            <span className="text-lg">Secure conversations</span>
          </div>

          <div className="flex items-center gap-4">
            <Zap size={24} />
            <span className="text-lg">Fast and reliable experience</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <h2 className="text-5xl font-bold text-gray-800">
            Welcome Back
          </h2>

          <p className="mt-3 text-gray-500">
            Login to continue your conversation.
          </p>

          <form className="mt-10 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-medium transition duration-200 cursor-pointer"
            >
              Login
            </button>

            <p className="text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-sky-600 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;