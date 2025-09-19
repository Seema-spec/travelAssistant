'use client'

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface LocationContextType {
  selectedLocations: string[];
  selectedCategory: string[];
  selectedDates: string[];
  budget: string | undefined;
  isLoading: boolean;
  itineraryData: string | undefined;
  toggleSelectLocation: (id: string) => void;
  toggleSelectDate: (value: string) => void;
  toggleSelectCategory: (value: string) => void;
  handleSubmit: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  setBudget: (value: string | undefined) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setItineraryData: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [itineraryData, setItineraryData] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [budget, setBudget] = useState<string>();
  const router = useRouter();

  const toggleSelectLocation = (value: string) => {
    setSelectedLocations((prev) => {
      const isSelected = prev.includes(value);
      return isSelected ? prev.filter((item) => item !== value) : [...prev, value];
    });
  };
  const toggleSelectCategory = (value: string) => {
    setSelectedCategory((prev) => {
      const isSelected = prev.includes(value);
      return isSelected ? prev.filter((item) => item !== value) : [...prev, value];
    });
  };

  const toggleSelectDate = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date)
        ? prev.filter((d) => d !== date)
        : [...prev, date]
    );
  };

  const handleSubmit = async (event?: React.MouseEvent<HTMLButtonElement>)=> {
    setIsLoading(true);
    const message = `Can you provide me with a detailed **budget-friendly itinerary** for these dates: ${selectedDates.join(
      ", "
    )}, focusing on the ${selectedCategory[0]} category, visiting ${selectedLocations[0]
      }, with a total budget of ${budget} INR?

    Please break it down into:
    - Day-wise **activities**
    - Approximate **food costs**
    - Approximate **travel costs**
    - Mention popular **landmarks or attractions** with a one-line description.

    Also suggest:
    - **Relevant image references** (like URLs to landmark images that I can show in UI).
    - **Helpful links** for booking hotels and buses (for example, suggest MakeMyTrip or RedBus links for this city). 
    Format it as **Markdown** with headings, bullet points, and links so it looks nice when rendered.
    `;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setItineraryData(data.response);
      setIsLoading(false)

      router.push('/itinerary')
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      setItineraryData('Error fetching response from GPT');
    }
  }

  return (
    <LocationContext.Provider
  value={{
    budget,
    isLoading,
    setBudget,
    selectedLocations,
    selectedDates,
    selectedCategory,
    toggleSelectDate,
    toggleSelectCategory,
    toggleSelectLocation,
    setIsLoading,
    itineraryData,
    setItineraryData,
    handleSubmit,
  }}
>
  {children}
</LocationContext.Provider>
  );
}

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};