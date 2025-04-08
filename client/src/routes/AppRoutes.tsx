import LoginPage from '@/pages/auth/LoginPage'
import HomePage from '@/pages/home/HomePage'
import ManagerLayout from '@/pages/manager/ManagerLayout'
import BacklogPage from '@/pages/manager/project/backlog/page'
import BoardPage from '@/pages/manager/project/board/page'
import ProjectPage from '@/pages/manager/project/page'
import RootLayout from '@/pages/RootLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='manager' element={<ManagerLayout />}>
            <Route path='project' element={<ProjectPage />}>
              <Route path='board' index element={<BoardPage />} />
              <Route path='backlog' element={<BacklogPage />} />
            </Route>
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
