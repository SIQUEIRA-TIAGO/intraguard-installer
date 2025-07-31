import { Router } from '../lib/electron-router-dom'
import { Route } from 'react-router-dom'
import Welcome from './pages/welcome'
import ChooseDir from './pages/chooseDir'
import SetupComplete from './pages/setupComplete'
import SetupDatabase from './pages/setupDatabase'
import Instalation from './pages/instalation'

export default function AppRoutes() {
  return (

    <Router
      main={
        <>
          <Route path="/" element={<Welcome />} />
          <Route path="/database" element={<SetupDatabase/>} />
          <Route path="/dir" element={<ChooseDir />} />
          <Route path="/instalation" element={<Instalation />}/>
          <Route path="/complete" element={<SetupComplete />} />
        </>
      }
    />
  )
}
