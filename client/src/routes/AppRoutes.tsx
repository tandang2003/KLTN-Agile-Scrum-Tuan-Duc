import LoginPage from '@/pages/auth/LoginPage'
import HomePage from '@/pages/home/HomePage'
import ManagerLayout from '@/pages/manager/layout'
import BacklogPage from '@/pages/manager/project/backlog/page'
import BoardPage from '@/pages/manager/project/board/page'
import ProjectPage from '@/pages/manager/project/page'
import NotFoundPage from '@/pages/not-found'
import RootLayout from '@/pages/layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='manager' element={<ManagerLayout />}>
            <Route path='project/:id' element={<ProjectPage />}>
              <Route index element={<BoardPage />} />
              <Route path='board' index element={<BoardPage />} />
              <Route path='backlog' element={<BacklogPage />} />
            </Route>
          </Route>
          <Route path='auth'>
            <Route path='login' index element={<LoginPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
