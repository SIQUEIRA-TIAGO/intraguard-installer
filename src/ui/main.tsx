import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routes from './routes'

import './index.css'
import AntdProvider from './providers/antdProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AntdProvider>
      <Routes />
    </AntdProvider>
  </StrictMode>,
)
