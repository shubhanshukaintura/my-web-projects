import React, { useState } from 'react';
import { HiDotsVertical } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { IoCaretDownCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

function Module({ index, moduleName, delModule, editModule }) {
  const [displayEditModule, setDisplayEditModule] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newModuleName, setNewModuleName] = useState(moduleName);

  const handleEdit = () => {
    setIsEditing(true);
    setDisplayEditModule(false);
  };

  const handleSave = () => {
    editModule(index, newModuleName);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className='flex justify-between w-[1000px] mt-3 bg-white p-4'>
        <div className='flex justify-center items-center gap-2'>
          <IoCaretDownCircleOutline />
          {isEditing ? (
            <div className='flex justify-between'>
            <input
              className='border p-2 rounded'
              type="text"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
            />
            <div className='flex w-[1000px] p-2'>
              <button className='border p-2 rounded' onClick={() => setIsEditing(false)}>Cancel</button>
              <button className='bg-green-800 border p-2 rounded text-white ml-2' onClick={handleSave}>Save</button>
            </div>
            </div>
          ) : (
            <span>{moduleName}</span>
          )}
        </div>
        <div className="relative">
          <button onClick={() => setDisplayEditModule(!displayEditModule)}><HiDotsVertical /></button>
          {displayEditModule && (
            <div className='w-[200px] absolute right-0 bg-white rounded shadow-md'>
              <h1 className='flex items-center p-4 gap-2 hover:bg-gray-100 cursor-pointer' onClick={handleEdit}><CiEdit />Edit module name</h1>
              <h1 className='flex items-center p-4 gap-2 hover:bg-gray-100 text-red-700 cursor-pointer' onClick={() => delModule(index)}><RiDeleteBin6Line />Delete</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Module;
