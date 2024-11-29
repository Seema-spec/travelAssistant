'use client'

import { createContext, useContext, useState, ReactNode } from "react";

interface LocationContextType {
    selectedLocations : string[];
    selectedCategory:string[];
    selectedDates:string[];
    toggleSelectLocation: (value: string) => void;
    toggleSelectDate: (value: string) => void;
    toggleSelectCategory: (value: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({children}:{children: ReactNode}) => {
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);

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

      return (
        <LocationContext.Provider value={{ selectedLocations, selectedDates, selectedCategory, toggleSelectDate, toggleSelectCategory, toggleSelectLocation }}>
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