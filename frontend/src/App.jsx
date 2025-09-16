import Home from './pages/home/Home'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthContext'

function App() {
  const { authUser } = useAuthContext()

  return (
    <div className='flex items-center justify-center p-4 h-screen'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
