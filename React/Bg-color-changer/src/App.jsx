import { useState } from "react";

function App() {
  const [color,setColor] = useState("black");

  return (
    <div className="w-full h-screen duration-200"
      style={{backgroundColor: color}}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center bg-white px-3 py-2 rounded-3xl gap-3">
            <button className="outline-none px-4 py-1 rounded-full text-white"
            style={{backgroundColor:"Red"}}
            onClick={() => setColor("Red")}>Red</button>

            <button className="outline-none px-4 py-1 rounded-full text-white"
            style={{backgroundColor:"Blue"}}
            onClick={() => setColor("Blue")}>Blue</button>

            <button className="outline-none px-4 py-1 rounded-full text-white"
            style={{backgroundColor:"Green"}}
            onClick={() => setColor("Green")}>Green</button>

            <button className="outline-none px-4 py-1 rounded-full text-white"
            style={{backgroundColor:"Yellow"}}
            onClick={() => setColor("Yellow")}>Yellow</button>
          </div>
      </div>
    </div>
  )
}

export default App
