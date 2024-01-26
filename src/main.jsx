import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DarkModeProvider } from './Dark.jsx'
import CssBaseline from '@mui/material/CssBaseline';

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
     <CssBaseline />
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
</React.StrictMode>
)
