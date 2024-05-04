import React, { useState } from 'react'

function InputBox(
  props
) {
  let [inputText,setInputText]=useState('');
  return (
    <div>
        <div className="flex gap-2">
          <input className='p-2 w-80'
              type="text"
              value={inputText}
              placeholder="Enter New Task"
              onChange={(e)=>{setInputText(e.target.value)}}
          />
          <button className='bg-red-700 text-white p-2'
            onClick={()=>{
              props.addTask(inputText)
              setInputText=("")
            }}
          >Add Task</button>
          </div>
    </div>
  )
}

export default InputBox