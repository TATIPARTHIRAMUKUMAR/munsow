import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DarkModeProvider } from './Dark.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
</React.StrictMode>
)
