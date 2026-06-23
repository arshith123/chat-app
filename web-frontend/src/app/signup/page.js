'use client'
import StepbasicDetails from "@/components/signup/StepbasicDetails";
import StepIndicator from "@/components/signup/StepIndicator";
import StepProfileSetup from "@/components/signup/StepProfileSetup";
import StepSuccess from "@/components/signup/StepSuccess";
import { useState } from "react";

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="min-h-screen bg-sky-600 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Join ChatApp and start connecting.
          </p>
        </div>

        <StepIndicator currentStep={currentStep} />

        <div className="mt-10">
          {currentStep === 1 && <StepbasicDetails />}
          {currentStep === 2 && <StepProfileSetup />}
          {currentStep === 3 && <StepSuccess />}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
