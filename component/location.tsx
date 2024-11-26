'use Client'
import { useLocation } from "@/context/locationContext";
import { Fragment, useState } from "react";

export default function Location() {
    const { selectedLocations, toggleSelectLocation } = useLocation();
    
    const locations = [
    {
      name: "Agra",
      image: "https://th-thumbnailer.cdn-si-edu.com/CbddkFFO3OB80rRz83Iiuf-Z0FY=/1000x750/filters:no_upscale():focal(1471x1061:1472x1062)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/b6/30/b630b48b-7344-4661-9264-186b70531bdc/istock-478831658.jpg",
    },
    {
      name: "Rajasthan",
      image: "https://assets.vogue.in/photos/5ce41ea8b803113d138f5cd2/2:3/w_1920,c_limit/Jaipur-Travel-Shopping-Restaurants.jpg",
    },
    {
      name: "Maharashtra",
      image: "https://www.holidaymonk.com/wp-content/uploads/2022/04/Gateway-Of-India-MUMBAI.jpg",
    },
    {
      name: "Goa",
      image: "https://backpackersunited.in/_next/image?url=https%3A%2F%2Fbpu-images-v1.s3.eu-north-1.amazonaws.com%2Fuploads%2Fgoa%202_11zon.webp&w=750&q=75",
    },
    {
      name: "Kolkata",
      image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/01/Victoria-Memorial.jpg",
    },
    {
      name: "Himachal Pradesh",
      image: "https://www.naturetravelagency.com/uploads/1703234831good%20time%20to%20visit%20Kullu%20Manali.jpg",
    },
  ];


  return (
    <Fragment>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Explore Locations in India</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {locations.map((location, index) => (
              <div key={index} className="group relative">
             
                <img
                  src={location.image}
                  alt={`Image of ${location.name}`}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-64"
                />
                <div
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer z-10 ${
                    selectedLocations.includes(location.name)
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "bg-white border-gray-300 text-gray-600"
                  }`}
                  onClick={() => toggleSelectLocation(location.name)}
                >
                  {selectedLocations.includes(location.name) ? "✓" : ""}
                </div>
               
                <div className="mt-4 flex justify-between">
                  <h3 className="text-lg font-medium text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      {location.name}
                    </a>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}