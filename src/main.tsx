import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DadosProvider } from "./context/DadosProvider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DadosProvider>
        <App />
    </DadosProvider>
  </StrictMode>,
)
