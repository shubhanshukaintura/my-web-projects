import React from 'react'

function TaskList(props) {
  return (
    <div>
        <div className="max-w-90 flex justify-between flex-wrap gap-5 text-white border-2 py-2 px-3">
            <div className="flex-grow flex-wrap">
              {props.item}
            </div>
            <div className="cursor-pointer">
              <i class="fa-solid fa-trash"
                onClick={()=>{
                  props.deleteTask(props.index);
                }}
              ></i>
            </div>
        </div>
    </div>
  )
}

export default TaskList