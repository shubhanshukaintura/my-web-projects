import React from 'react'
import { VscChromeClose } from "react-icons/vsc";

function AddModal({modalVisible,setModalVisible}) {
  return (
    <>
    { modalVisible && (
    <div className='fixed inset-0 flex items-center justify-center bg-black-800 bg-opacity-50 backdrop-blur-3xl'>
      <div className='w-[350px] h-[210px] flex flex-col bg-white gap-5 p-5'>
        <div className='flex justify-between'>
            <h1><b>Create new module</b></h1>
            <button onClick={()=>setModalVisible(false)}><VscChromeClose /></button>
        </div>
        <div>
          <h1>Module name</h1>
          <input className='w-full border p-2 rounded' type="text" placeholder="Enter module" />
        </div>
        <div className='flex gap-3 justify-end'>
          <button className='border p-2 rounded'>Cancel</button>
          <button className='bg-green-800 border p-2 rounded text-white'>Create</button>
        </div>
      </div>
    </div>)}
    </>
  )
}

export default AddModal;
