'use client'
import { MessageCircle, ShieldCheck, Zap, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await login(email.trim(), password);
      
      if (res.success && res.data) {
        toast.success("Login successful!");
        // Save the authentication token and user profile in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        // Redirect to the chats dashboard
        router.push("/chats");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      toast.error(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-medium transition duration-200 cursor-pointer disabled:bg-sky-400 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? "Logging in..." : "Login"}
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