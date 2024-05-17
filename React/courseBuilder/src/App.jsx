import AddButton from './AddButton'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddButton/>
    </>
  )
}

export default App
