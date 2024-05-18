import React, { useState } from 'react';
import { VscAdd } from "react-icons/vsc";
import { FaCaretDown } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { LiaUploadSolid } from "react-icons/lia";

function AddButton({ onOpenModal }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative inline-block">
      <button
        className="flex justify-center items-center bg-red-700 text-white p-2 px-4 rounded-md"
        onClick={toggle}
      >
        <VscAdd className="m-1" />
        Add
        <FaCaretDown className="m-1" />
      </button>
      {isVisible && (
        <ul className="w-[200px] border rounded absolute bg-white mt-2 left-0">
          <li
            className="flex px-2 py-1 cursor-pointer hover:bg-gray-200"
            onClick={() => { onOpenModal(); setIsVisible(false); }}
          >
            <CiViewTable className="m-1" />Create Module
          </li>
          <li className="flex px-2 py-1 cursor-pointer hover:bg-gray-200">
            <IoIosLink className="m-1" />Add a link
          </li>
          <li className="flex px-2 py-1 cursor-pointer hover:bg-gray-200">
            <LiaUploadSolid className="m-1" />Upload
          </li>
        </ul>
      )}
    </div>
  );
}

export default AddButton;
