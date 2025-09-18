"use client";

import Itinerary from "@/component/itinerary";


export default function ItineraryPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 md:p-10">
        <Itinerary />
      </div>
    </main>
  );
}

