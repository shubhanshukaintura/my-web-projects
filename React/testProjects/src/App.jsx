import { useState } from 'react'
import InputBox from './components/InputBox'
import TaskList from './components/TaskList'

function App() {
  const [taskList,setTaskList] = useState([]);

  let addTask = (inputText)=>{
    setTaskList([...taskList,inputText]);
    console.log(taskList);
  }
  return (
    <>
    <div className="w-full h-screen bg-black flex flex-col justify-center items-center gap-2">
      <div>
        <InputBox addTask={addTask}
        />
      </div>
      <div className="x-2">
          <TaskList taskList={taskList}/>
      </div>
    </div>
    </>
  )
}

export default App
