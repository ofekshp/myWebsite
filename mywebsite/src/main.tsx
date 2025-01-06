import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider
    clientId="646745998900-qqtsg1rqaf2905vfj5m6s4q7t0va884v.apps.googleusercontent.com">
  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>
)
