import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SettingsPanel } from '../shared/SettingsPanel'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsPanel />
  </StrictMode>,
)
