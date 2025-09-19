'use client'
import DateAndTime from "@/component/date&time";
import ExploreCategories from "@/component/interest";
import Location from "@/component/location";
import { useLocation } from "@/context/locationContext";

import { Fragment, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const {isLoading, handleSubmit } = useLocation();

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleClickNext = () => {
    setActiveStep(prevStep => prevStep + 1)
  }

  return (
    <Fragment>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center"
        style={{
          backgroundImage: `
            url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')
          `,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}
      >
        <div className="flex justify-center items-center space-x-4 mt-32 bg-white/30 p-4 rounded-xl">
          {/* Step 1: Personal Details */}
          <div
            className={`flex items-center px-3 py-2 sm:px-5 sm:py-3 border rounded-full cursor-pointer ${activeStep === 1 ? "border-purple-600" : "border-gray-300"}`}
            onClick={() => handleStepChange(1)}
          >
            <div
              className={`rounded-full flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 cursor-pointer ${activeStep === 1 ? "bg-purple-600 text-white" : "border-2 border-purple-600 text-purple-600"}`}
            >
              {activeStep > 1 ? "✓" : "1"}
            </div>
            <span
              className={`ml-2 text-xs sm:text-sm font-medium ${activeStep === 1 ? "text-purple-600" : ""}`}
            >
              Location Details
            </span>
          </div>

          {/* Step Divider */}
          <div className="h-px w-10 bg-gray-300"></div>

         <div
            className={`flex items-center px-3 py-2 sm:px-5 sm:py-3 border rounded-full cursor-pointer ${activeStep === 2 ? "border-purple-600" : "border-gray-300"}`}
            onClick={() => handleStepChange(2)}
          >
             <div
              className={`rounded-full flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 cursor-pointer ${activeStep === 2 ? "bg-purple-600 text-white" : "border-2 border-purple-600 text-purple-600"}`}
            >
              {activeStep > 2 ? "✓" : "2"}
            </div>
            <span
              className={`ml-2 text-xs sm:text-sm font-medium ${activeStep === 2 ? "text-purple-600" : ""}`}
            >
              Explore Categories
            </span>
          </div>

          {/* Step Divider */}
          <div className="h-px w-10 bg-gray-300"></div>

          {/* Step 3: Date and Time */}
          <div
            className={`flex items-center px-3 py-2 sm:px-5 sm:py-3 border rounded-full cursor-pointer ${activeStep === 3 ? "border-purple-600" : "border-gray-300"}`}
            onClick={() => handleStepChange(3)}
          >
             <div
              className={`rounded-full flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 cursor-pointer ${activeStep === 3 ? "bg-purple-600 text-white" : "border-2 border-purple-600 text-purple-600"}`}
            >
              {activeStep > 3 ? "✓" : "3"}
            </div>
            <span
              className={`ml-2 text-xs sm:text-sm font-medium ${activeStep === 3 ? "text-purple-600" : ""}`}
            >
              Date and Time
            </span>
          </div>
        </div>

        {/* Steps Content */}
        <div className="mt-8 w-full max-w-7xl bg-white/40 p-6 rounded-xl shadow-lg">
          {activeStep === 1 && <Location />}
          {activeStep === 2 && <ExploreCategories />}
          {activeStep === 3 && <DateAndTime />}
          <div className="mt-8 flex justify-center space-x-4 w-full max-w-3xl">
            <button className="px-8 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Back
            </button>
            {activeStep < 3 ?
              <button className="px-8 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700" onClick={handleClickNext}>
                Next
              </button> :
              <button className="px-8 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"  onClick={() => handleSubmit()}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>}
          </div>
        </div>

        {/* Buttons */}
      </div>
    </Fragment>
  );
}
