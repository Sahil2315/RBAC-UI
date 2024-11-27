import { useState } from 'react'
import adminSVG from '../assets/admin.svg'
import userSVG from '../assets/user.svg'
import modSVG from "../assets/mod.svg"
import contribSVG from "../assets/contrib.svg"
import memberSVG from "../assets/member.svg"
import Navbar from './Navbar'
import Wrapper from './Wrapper'
import { role } from '../types'
import { useSelector } from 'react-redux'
import { RootState } from '../data/store'

const Container = () => {
    
  let roles: role[] = useSelector((state: RootState) => state.roles) 
  let [currRole, setRole] = useState(4)
  let [selectVisible, toggleSelect] = useState(false)
  return (
    <div>
        <div className='fixed top-0 bg-white z-10 border-b-2 border-slate-200 left-0 py-4 h-max w-full'>
            <div className='text-3xl mx-6'>RBAC - Role Based Access Control <span className='font-light'>for Online Communities</span></div>
            <div className='absolute right-0 top-0'>
            <button onClick={() => {toggleSelect(!selectVisible)}} className='mx-4 flex outline-none flex-row items-center justify-center my-4 border-2 border-slate-300 text-xl rounded-lg w-[210px]'>
                <img className='h-[35px] mr-2 mb-1' src={roles[currRole].name == "Admin" ? adminSVG : roles[currRole].name == "Moderator" ? modSVG : roles[currRole].name == "Contributor" ? contribSVG : roles[currRole].name == "Member" ? memberSVG : userSVG} alt={roles[currRole].name} />
                <span>{roles[currRole].name}</span>
            </button>
            <Navbar setRole={setRole} selectVisible={selectVisible} toggleSelect={toggleSelect} />
            </div>
        </div>
        <Wrapper setRole={setRole} currRole={currRole} />
    </div>
  )
}

export default Container