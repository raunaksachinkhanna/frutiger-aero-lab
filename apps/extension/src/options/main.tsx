import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SettingsPanel } from '../shared/SettingsPanel'
import './options.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="options-page">
      <SettingsPanel full />
    </div>
  </StrictMode>,
)
