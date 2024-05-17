import AddButton from './components/AddButton'
import emptyBox from './Assets/emptyBox.png'
import AddCard from './components/AddCard'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="w-full h-screen bg-gray-100">
        <div className="flex justify-between px-60 py-20">
          <h1><b>Course Builder</b></h1>
          <AddButton/>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src={emptyBox} className='w-[250px] h-[200px]'/>
          <h1><b>Nothing added here yet</b></h1>
          <h1>Click on the [+] Add button to add items to this course</h1>
        </div>
        <AddCard/>
      </div>
    </>
  )
}

export default App
