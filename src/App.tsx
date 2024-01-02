import './App.css'
import AppRoutes from './routers'
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Analytics />
      <AppRoutes />
    </>
  )
}

export default App
