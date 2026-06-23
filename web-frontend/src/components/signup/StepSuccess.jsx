import { CheckCircle2 } from "lucide-react";

const StepSuccess = () => {
  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={56} className="text-green-600" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-3">
        Account Created!
      </h2>

      <p className="text-gray-500 mb-8">
        Your account has been successfully created. You can now sign in and
        start chatting with friends.
      </p>

      <button className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-medium transition-colors">
        Go to Login
      </button>
    </div>
  );
};

export default StepSuccess;