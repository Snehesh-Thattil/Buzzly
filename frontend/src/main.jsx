import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { SocketContextProvider } from './contexts/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode >
)
