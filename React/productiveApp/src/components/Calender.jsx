import React from 'react'

function Calender() {
  

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-white w-80 rounded-md">
        <div className="flex flex-col bg-red-700 w-80 justify-center items-center text-white rounded-md">
          <h1 className="text-lg font-bold">MAY</h1>
          <p>Date</p>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-4 py-2">
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
            <li>Sun</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Calender