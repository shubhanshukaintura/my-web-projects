import { useState } from 'react'
import InputBox from './components/InputBox'
import TaskList from './components/TaskList'
import Calender from './components/Calender';

function App() {
  const [taskList,setTaskList] = useState([]);
  let addTask = (inputText)=>{
    setTaskList([...taskList,inputText]);
    console.log(taskList);
  }

  let deleteTask = (index)=>{
    let newArr = [...taskList];
    newArr.splice(index,1)
    setTaskList([...newArr])
  }

  return (
    <>
    <div className="w-full h-screen bg-black flex justify-center items-center gap-10">
      <Calender/>
      <div>
        <InputBox addTask={addTask}
        />
        <div className="x-2 flex flex-col mt-1 gap-2">
          {taskList.map((listItem,i)=>{
            return(
              <TaskList key={i} index={i} item={listItem} deleteTask={deleteTask}/>
            )
          })}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
