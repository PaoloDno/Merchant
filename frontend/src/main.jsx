import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import ThemeWrapper from './components/themeWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
  </StrictMode>,
)
