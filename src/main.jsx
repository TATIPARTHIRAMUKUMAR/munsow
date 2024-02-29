import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DarkModeProvider } from './Dark.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import store from './redux/store.js'
import { Provider } from 'react-redux'

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
  <CssBaseline />
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
</Provider>
)
