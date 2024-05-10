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
    <div className="w-full h-screen bg-black flex flex-col justify-center items-center gap-2">
      <div>
        <InputBox addTask={addTask}
        />
      </div>
      <div className="x-2 flex flex-col gap-3">
        {taskList.map((listItem,i)=>{
          return(
            <TaskList key={i} index={i} item={listItem} deleteTask={deleteTask}/>
          )
        })}
      </div>
      <Calender/>
    </div>
    </>
  )
}

export default App
