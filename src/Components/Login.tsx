import { useState } from "react"
import onlineComm from "../assets/onlinecomm.jpg"
import { useNavigate } from "react-router-dom"

const Login = () => {
    let navigate = useNavigate()
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let emailValidate = (email: string) => {
        let confirm = email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        if(confirm || email.length == 0) return true
        else return false
    }
    let navigateAfterCheck = (route: string) => {
        if( emailValidate(email) && email.length > 0 && password.length >= 8 ){
            navigate(route)
        }
        else if (email.length == 0 || password.length == 0){
            alert("One or More Inputs are Left Blank\nPlease Check Carefully and then Sign in!")
        }
        else if ( !emailValidate(email) && password.length < 8 ){
            alert("Please Enter Valid Inputs")
        }
        else if( !emailValidate(email) ){
            alert("Enter Valid Email Address")
        }
        else if( password.length < 8 ){
            alert("Wrong Password\nPassword Too Short")
        }
    }
  return (
    <div className="pt-28 h-full w-full flex flex-row items-center">
        <div className='fixed top-0 border-b-2 border-slate-200 left-0 py-4 h-max w-full'>
            <div className='text-3xl mx-6'>RBAC - Role Based Access Control <span className='font-light'>for Online Communities</span></div>
            <div className='absolute right-0 top-0'>
            </div>
        </div>
        <div className="flex-1">
            <img src={onlineComm} alt="Image - Online Community" className="rounded-xl h-[680px] ml-8"/>
        </div>
        <div className="flex flex-row w-[700px] justify-center">
            <div className="flex relative flex-col items-center justify-center border-2 px-16 h-[680px] border-indigo-200 rounded-xl">
                <span className="text-4xl font-semibold">Login</span>
                <span className="mt-4">Get into the Community by Logging in</span>
                <input onChange={(e) => setEmail(e.target.value)} className={`border text-xl py-1 px-3 w-[450px] mt-16 rounded-lg outline-none ${emailValidate(email) ? 'border-slate-400' : 'border-red-600'}`} placeholder="Email ID" type="text" />
                <span className={`w-full mt-1 text-sm text-red-600 ${emailValidate(email) ? 'opacity-0' : ''}`}>Enter Email in Valid Format</span>
                <input onChange={(e) => setPassword(e.target.value)} className={`border text-xl py-1 px-3 w-[450px] mt-16 rounded-lg outline-none ${password.length >= 8 || password.length == 0 ? 'border-slate-400' : 'border-red-600' }`} placeholder="Password" type="password" />
                <span className={`w-full mt-1 text-sm text-red-600 ${password.length >= 8 || password.length == 0 ? 'opacity-0' : 'border-red-600' }`}>Passwords are more than 8 Characters</span>
                <button onClick={() => navigateAfterCheck('/postLogin')} className="mt-24 bg-blue-400 px-6 py-1 rounded-md text-xl text-white hover:bg-indigo-500">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login