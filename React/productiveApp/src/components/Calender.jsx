import React, { useState, useEffect } from 'react';

function Calendar() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const firstDay = new Date(new Date().getFullYear(), currentMonth, 1).getDay();
    const lastDay = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();
    const daysArr = Array.from({ length: firstDay > 0 ? firstDay - 1 : 6 }).fill(0);
    
    for (let i = 1; i <= lastDay; i++) {
      daysArr.push(i);
    }
    
    setDays(daysArr);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-white w-[400px] rounded-md">
      <div className="bg-red-700 w-full text-white rounded-t-md py-2">
        <h1 className="text-lg font-bold text-center">MAY</h1>
        <p className="text-center">Date</p>
      </div>
      <div className="w-full">
        <ul className="flex flex-wrap justify-center items-center gap-1 py-2 px-2">
          <li className="w-[50px] h-[50px] flex justify-center items-center">Mon</li>
          <li className="w-[50px] h-[50px] flex justify-center items-center">Tue</li>
          <li className="w-[50px] h-[50px] flex justify-center items-center">Wed</li>
          <li className="w-[50px] h-[50px] flex justify-center items-center">Thu</li>
          <li className="w-[50px] h-[50px] flex justify-center items-center">Fri</li>
          <li className="w-[50px] h-[50px] flex justify-center items-center">Sat</li>
          <li className="w-[50px] h-[50px] flex justify-center items-center">Sun</li>
        </ul>
        <ul className="flex flex-wrap items-center gap-1 py-2 px-3">
          {days.map((day, index) => (
            <li key={index} className="w-[50px] h-[50px] flex justify-center items-center border">{day !== 0 ? day : ''}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;
