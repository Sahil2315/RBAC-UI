import { useState } from "react"
import joinUs from "../assets/joinus.jpg"

const Welcome = ({setRole}: {setRole: (role: number) => void}) => {
  let [overlay, toggleOverlay] = useState(false)
  return (
    <div>
      <div className='mt-16 pb-2 text-2xl text-center mx-64 border-b border-black'>
          Welcome
      </div>    
      <div className='mx-64 p-8 flex flex-col items-center rounded-lg bg-stone-200 mt-8'>
        <span className='text-3xl'>Start by joining our Community</span>
        <img src={joinUs} className="h-[450px] mt-6 rounded-lg w-max" alt="Online Community" />
        <button onClick={() => toggleOverlay(true)} className="px-6 py-1 rounded-lg bg-indigo-400 text-white text-xl mt-4 hover:bg-purple-400">Join</button>
      </div>
      <div className={`absolute flex justify-center items-center top-0 left-0 w-full h-full z-10 backdrop-blur ${overlay ? '': 'hidden'}`}>
        <div className="bg-white p-24 flex flex-col items-center rounded-lg">
          <span className="text-3xl">Congrats!</span>
          <span className="text-2xl mt-6">You are now a Registered Member of Our Community</span>
          <button onClick={() => {setRole(3)}} className="bg-emerald-400 text-white text-lg py-1 px-4 rounded-md mt-8 w-max hover:bg-blue-400">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Welcome