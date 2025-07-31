import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </>
)
