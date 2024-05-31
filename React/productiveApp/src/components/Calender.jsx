import React, { useState, useEffect } from 'react';
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

function Calendar() {
  const [days, setDays] = useState([]);
  const [monthSlider, setMonthSlider] = useState(0);
  const [month, setMonth] = useState('');
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const nextMonth = () => {
    setMonthSlider(monthSlider + 1);
  };

  const prevMonth = () => {
    setMonthSlider(monthSlider - 1);
  };

  useEffect(() => {
    const date = new Date();
    const currentMonth = date.getMonth() + monthSlider;
    const currentYear = date.getFullYear();

    let adjustedMonth = currentMonth;
    let adjustedYear = currentYear;

    if (currentMonth < 0) {
      adjustedMonth = 12 + (currentMonth % 12);
      adjustedYear = currentYear + Math.floor(currentMonth / 12);
    } else if (currentMonth > 11) {
      adjustedMonth = currentMonth % 12;
      adjustedYear = currentYear + Math.floor(currentMonth / 12);
    }

    setMonth(monthName[adjustedMonth]+' '+adjustedYear);

    const firstDay = new Date(adjustedYear, adjustedMonth, 1).getDay();
    const lastDay = new Date(adjustedYear, adjustedMonth + 1, 0).getDate();
    const daysArr = Array.from({ length: firstDay > 0 ? firstDay - 1 : 6 }).fill(0);

    for (let i = 1; i <= lastDay; i++) {
      daysArr.push(i);
    }

    setDays(daysArr);
  }, [monthSlider]);

  return (
    <div className="flex flex-col justify-center items-center bg-white w-[400px] rounded-md">
      <div className="flex justify-between items-center bg-red-700 w-full text-white rounded-t-md p-2">
        <button onClick={prevMonth}><IoMdArrowDropleftCircle size={30} /></button>
        <h1 className="text-lg font-bold text-center">{month}</h1>
        <button onClick={nextMonth}><IoMdArrowDroprightCircle size={30} /></button>
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
