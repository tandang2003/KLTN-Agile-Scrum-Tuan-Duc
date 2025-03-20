import LoginPage from '@/pages/auth/LoginPage'
import HomePage from '@/pages/home/HomePage'
import ManagerLayout from '@/pages/manager/ManagerLayout'
import ProjectManagerPage from '@/pages/manager/ProjectManagerPage'
import RootLayout from '@/pages/RootLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='manager' element={<ManagerLayout />}>
            <Route path='project' index element={<ProjectManagerPage />} />
          </Route>
          <Route path='auth'>
            <Route path='login' index element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
