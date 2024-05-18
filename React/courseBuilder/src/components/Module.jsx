import React from 'react';
import { HiDotsVertical } from "react-icons/hi";
import { IoCaretDownCircleOutline } from "react-icons/io5";

function Module({ moduleName }) {
  return (
    <div className="flex justify-center items-center">
      <div className='flex justify-between w-[1000px] bg-white p-4'>
        <div className='flex justify-center items-center gap-2'>
          <IoCaretDownCircleOutline />
          {moduleName}
        </div>
        <div>
          <HiDotsVertical />
        </div>
      </div>
    </div>
  );
}

export default Module;
