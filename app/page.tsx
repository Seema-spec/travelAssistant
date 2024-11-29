'use client'
import DateAndTime from "@/component/date&time";
import ExploreCategories from "@/component/interest";
import Location from "@/component/location";
import { useLocation } from "@/context/locationContext";
import { Fragment, useState } from "react";


export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const { selectedCategory, selectedLocations, selectedDates} = useLocation();
  const [itineraryData, setItineraryData] = useState('');

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleClickNext = () => {
   setActiveStep(prevStep => prevStep+1)
  }

  console.log(selectedCategory, selectedLocations, selectedDates,"====");

  const handleSubmit = async() =>{
    const message = `Can you provide me with a detailed itinerary for these dates: ${selectedDates.join(', ')}, focusing on the ${selectedCategory[0]} category and visiting the ${selectedLocations[0]} location?`;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      console.log(data,"=====");
      
      setItineraryData(data.response);
    } catch (error) {
      console.error(error);
      setItineraryData('Error fetching response from GPT');
    }
  }

  return (
    <Fragment>
      <div className="flex justify-center items-center space-x-4 mt-32">
        {/* Step 1: Personal Details */}
        <div
          className={`flex items-center px-5 py-3 border rounded-full cursor-pointer ${activeStep === 1
            ? "border-purple-600"
            : "border-gray-300"
            }`}
          onClick={() => handleStepChange(1)}
        >
          <div
            className={`rounded-full flex items-center justify-center w-8 h-8 cursor-pointer ${activeStep === 1
              ? "bg-purple-600 text-white"
              : "border-2 border-purple-600 text-purple-600"
              }`}
          >
            {activeStep > 1 ? "✓" : "1"}
          </div>
          <span
            className={`ml-2 font-medium ${activeStep === 1 ? "text-purple-600" : ""
              }`}
          >
            Location Details
          </span>
        </div>

        {/* Step Divider */}
        <div className="h-px w-10 bg-gray-300"></div>

        <div
          className={`flex items-center px-5 py-3 border rounded-full cursor-pointer ${activeStep === 2
            ? "border-purple-600"
            : "border-gray-300"
            }`}
          onClick={() => handleStepChange(2)} 
        >
          <div
            className={`rounded-full flex items-center justify-center w-8 h-8  ${activeStep === 2
              ? "bg-purple-600 text-white"
              : "border-2 border-purple-600 text-purple-600"
              }`}
          >
            {activeStep > 2 ? "✓" : "2"}
          </div>
          <span
            className={`ml-2 font-medium ${activeStep === 2 ? "text-purple-600" : ""
              }`}
          >
            Explore Categories
          </span>
        </div>

        {/* Step Divider */}
        <div className="h-px w-10 bg-gray-300"></div>

        {/* Step 3: Date and Time */}
        <div
          className={`flex items-center px-5 py-3 border rounded-full cursor-pointer ${activeStep === 3
            ? "border-purple-600"
            : "border-gray-300"
            }`}
          onClick={() => handleStepChange(3)}
        >
          <div
            className={`rounded-full flex items-center justify-center w-8 h-8 ${activeStep === 3
              ? "bg-purple-600 text-white"
              : "border-2 border-purple-600 text-purple-600"
              }`}
          >
            {activeStep > 3 ? "✓" : "3"}
          </div>
          <span
            className={`ml-2 font-medium ${activeStep === 3 ? "text-purple-600" : ""
              }`}
          >
            Date and Time
          </span>
        </div>
      </div>
      {activeStep === 1 && <Location />}
      {activeStep === 2 && <ExploreCategories />}
      {activeStep === 3 && <DateAndTime />}
      <div className="mt-8 my-8 mr-36 flex justify-end space-x-4">
        <button className="px-8 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
          Back
        </button>
        {activeStep < 3 ?
        <button className="px-8 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700" onClick={handleClickNext}>
          Next
        </button> :
        <button className="px-8 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700" onClick={handleSubmit}>
          Save
        </button>}
      </div>
    </Fragment>
  );
}
