import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// italic carries the storybook display voice (needs opsz/SOFT/WONK axes → full);
// upright only serves the wordmark and eyebrow fallbacks → lighter wght-only file.
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource-variable/fraunces/wght.css'
import '@fontsource-variable/inter/wght.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
