import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ScholarProvider } from './context/ScholarContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScholarProvider>
      <App />
    </ScholarProvider>
  </React.StrictMode>,
)
