import React from 'react'
import { VscAdd } from "react-icons/vsc";
import { FaCaretDown } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { LiaUploadSolid } from "react-icons/lia";

function AddButton() {
  return (
    <>
    <button className="flex justify-center items-center bg-red-700 text-white p-2 px-4 rounded-md">
      <VscAdd className="m-1"/>
      Add
      <FaCaretDown className="m-1"/>
    </button>
    <ul className="w-40 border rounded p-3">
      <li className="flex"><CiViewTable className="m-1"/>Create Module</li>
      <li className="flex"><IoIosLink className="m-1"/>Add a link</li>
      <li className="flex"><LiaUploadSolid className="m-1"/>Upload</li>
    </ul>
    </>
  )
}

export default AddButton