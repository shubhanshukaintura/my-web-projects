import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  let [length, setLength] = useState(8)
  let [numberAllowed, setNumberAllowed] = useState(false)
  let [charAllowed, setCharAllowed] = useState(false)
  let [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="(){}!@#$%^&*_+?`"
    for(let i=1; i<=length; i++){
      let rn=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(rn)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword,])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg bg-gray-900 text-green-400">
          <div className="flex shadow rounded-xl overflow-hidden py-3 px-3">
          <input 
            type="text" 
            value={password}
            className='outline-none w-full py-1 px-3 rounded-md text-orange-400 font-bold'
            placeholder='Password'
            ref = {passwordRef}
            readOnly
          />
          <button onClick={copyPassword}
           className='px-2 bg-orange-700 shrink-0 text-white rounded-md'>Copy</button>
          </div>
          <div className="flex shadow rounded-xl overflow-hidden py-3 px-3 gap-2">
          <input 
            type="range" 
            min={6}
            max={16}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
          /><label>Length: {length}</label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed((prev)=>!prev);
            }}
          /><label htmlFor="numberInput">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={()=>{
              setCharAllowed((prev)=>!prev);
            }}
          /><label htmlFor="charInput">Characters</label>
          </div>
      </div>
    </>
  )
}

export default App
