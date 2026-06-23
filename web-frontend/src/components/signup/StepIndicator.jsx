const StepIndicator = ({ currentStep }) => {
  const labels = {
    1: "Basic Details",
    2: "Profile Setup",
    3: "Success",
  };

  const percentage = (currentStep / 3) * 100

  console.log("percentage",percentage);
  

  return (
    <div className="w-full max-w-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          {`Step ${currentStep} of 3`}
        </span>

        <span className="text-sm font-medium text-sky-600">
          {labels[currentStep]}
        </span>
      </div>
       <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
