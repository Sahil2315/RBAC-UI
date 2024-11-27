import { role } from '../types'
import adminSVG from '../assets/admin.svg'
import userSVG from '../assets/user.svg'
import modSVG from "../assets/mod.svg"
import contribSVG from "../assets/contrib.svg"
import memberSVG from "../assets/member.svg"
import { useSelector } from 'react-redux'
import { RootState } from '../data/store'


const Navbar = ({ setRole, selectVisible, toggleSelect}: {setRole: (role: number) => void, selectVisible: boolean, toggleSelect: (selected: boolean) => void}) => {
  let roles: role[] = useSelector((state: RootState) => state.roles) 
  return (
    <div className={`absolute mt-2 w-[210px] ml-4 flex flex-col overflow-hidden bg-sky-100 rounded-xl ${selectVisible ? '' : 'hidden'}`}>
        {
          roles.map((item, index) => {
            let icon = userSVG
            if(item.name == "Admin") icon = adminSVG
            else if(item.name == "Moderator") icon = modSVG
            else if(item.name == "Contributor") icon = contribSVG
            else if(item.name == "Member") icon = memberSVG
            return(
                <button onClick={() => {
                setRole(index)
                toggleSelect(false)
                }} className="flex flex-row pl-4 w-full text-xl items-center hover:bg-slate-200" key={index}>
                <img className='h-[35px] mr-2 mb-1' src={icon} alt={item.name} />
                <span>{item.name}</span>
                </button>
            )
          })
        }
    </div>
  )
}

export default Navbar