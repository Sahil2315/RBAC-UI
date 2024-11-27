import './App.css'
import Container from './Components/Container'
import Login from './Components/Login'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div id='mainDiv' className='w-full h-full pt-4'>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/postLogin" element={<Container />} />
      </Routes>
    </div>
  )
}

export default App
