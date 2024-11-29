import { useLocation } from '@/context/locationContext';
import React, { useState } from 'react';

export default function DateAndTime() {
  const today = new Date();
  const { selectedDates, toggleSelectDate } = useLocation();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [activeArrow, setActiveArrow] = useState<string | null>(null);
  const currentDate = today.getDate();

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();



  const isDateSelected = (date: string) => selectedDates.includes(date);

  const handlePrevMonth = () => {
    setActiveArrow('prev');
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonthIndex === 0) {
      setCurrentYear((prev) => prev - 1);
    }
    setTimeout(() => setActiveArrow(null), 300);
  };

  const handleNextMonth = () => {
    setActiveArrow('next');
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonthIndex === 11) {
      setCurrentYear((prev) => prev + 1);
    }
    setTimeout(() => setActiveArrow(null), 300); 
  };

  const renderCalendar = (monthIndex: number, year: number) => {
    const month = new Date(year, monthIndex).toLocaleString('default', {
      month: 'long',
    });
    const dates = Array.from(
      { length: daysInMonth(monthIndex, year) },
      (_, i) => i + 1
    );

    return (
      <div className="flex flex-col items-center w-[360px]">
        <h3 className="text-lg font-semibold mb-2">{`${month} ${year}`}</h3>
        <div className="grid grid-cols-7 gap-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <span key={index} className="text-sm text-gray-500 text-center">
              {day}
            </span>
          ))}
          {dates.map((date) => (
            <button
              key={date}
              className={`w-10 h-10 rounded-full text-sm ${
                isDateSelected(`${month}-${date}`)
                  ? 'bg-blue-500 text-white'
                  : date === currentDate &&
                    monthIndex === today.getMonth() &&
                    year === today.getFullYear()
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-blue-200'
              }`}
              onClick={() => toggleSelectDate(`${month}-${date}`)}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Select Date for Your Trip</h1>
      <p className="text-sm text-gray-500 mb-4">
        Current Date and Time:{' '}
        {today.toLocaleString('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })}
        </p>

        <div className="flex items-center gap-4 border mb-4 p-6 rounded-lg">
        <button
          onClick={handlePrevMonth}
          className={`p-3 rounded-full transition-colors duration-300 ${
            activeArrow === 'prev' ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-purple-300'
          }`}
        >
          &larr;
        </button>
        {renderCalendar(currentMonthIndex, currentYear)}
        <button
          onClick={handleNextMonth}
          className={`p-3 rounded-full transition-colors duration-300 ${
            activeArrow === 'next' ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-purple-300'
          }`}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
