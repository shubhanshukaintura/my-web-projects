import React, { useState } from 'react'

function InputBox(
  props
) {
  let [inputText,setInputText]=useState('');
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.addTask(inputText)
    }
  };
  return (
    <div>
        <div className="flex gap-2">
          <input className='p-2 w-80'
              type="text"
              value={inputText}
              placeholder="Enter New Task"
              onChange={(e)=>{setInputText(e.target.value)}}
              onKeyDown={handleKeyDown}
          />
          <button className='bg-red-700 text-white p-2'
            onClick={()=>{
              props.addTask(inputText)
              setInputText("")
            }}
          >Add Task</button>
          </div>
    </div>
  )
}

export default InputBox