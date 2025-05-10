import LoginPage from '@/pages/auth/login/page'
import HomePage from '@/pages/home/page'
import NotFoundPage from '@/pages/not-found'
import RootLayout from '@/pages/layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from '@/pages/auth/register/page'
import AuthLayout from '@/pages/auth/layout'
import GuestOnly from '@/components/wrapper/GuestOnly'
import WorkspacePage from '@/pages/manager/workspace/page'
import ManagerPage from '@/pages/manager/page'
import ManagerLayout from '@/pages/manager/layout'
import ProjectPage from '@/pages/manager/workspace/project/page'
import BoardPage from '@/pages/manager/workspace/project/board/page'
import BacklogPage from '@/pages/manager/workspace/project/backlog/page'
import WorkspaceDetailPage from '@/pages/manager/workspace/[:id]/page'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import { KanbanDemo } from '@/pages/manager/workspace/project/kaban/page'
import WorkspaceSettingPage from '@/pages/manager/workspace/[:id]/setting/page'
import InviteProjectPage from '@/pages/verification/invite-project/page'
import SettingLayout from '@/pages/manager/workspace/[:id]/setting/layout'

// http://localhost:3000/manager/workspace
// http://localhost:3000/manager/workspace/project/1

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {/* <Route path='kaban' element={<KanbanDemo />} /> */}
          <Route index element={<HomePage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='kaban' element={<BoardPage />} />
          <Route path='kaban1' element={<KanbanDemo />} />
          <Route
            path='auth'
            element={
              <GuestOnly mode='home'>
                <AuthLayout />
              </GuestOnly>
            }
          >
            <Route path='login' index element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </Route>

          <Route
            path='manager'
            element={
              <RequiredAuth mode='login'>
                <ManagerLayout />
              </RequiredAuth>
            }
          >
            {/* http://localhost:3000/manager */}
            <Route index element={<ManagerPage />} />
            {/* http://localhost:3000/manager/workspace */}
            <Route path='workspace' element={<WorkspacePage />} />
            {/* http://localhost:3000/manager/workspace/1 */}
            <Route
              path='workspace/:workspaceId'
              element={<WorkspaceDetailPage />}
            />
            {/* http://localhost:3000/manager/workspace/1/setting */}
            <Route
              path='workspace/:workspaceId/setting'
              element={<SettingLayout />}
            >
              <Route index element={<WorkspaceSettingPage />} />
            </Route>
            {/* http://localhost:3000/manager/workspace/project/1 */}
            <Route
              path='workspace/project/:projectId'
              element={<ProjectPage />}
            >
              <Route index element={<BoardPage />} />
              {/* http://localhost:3000/manager/workspace/project/1/board */}
              <Route path='board' index element={<BoardPage />} />
              <Route path='backlog' element={<BacklogPage />} />
            </Route>
          </Route>

          <Route path='/404' element={<NotFoundPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
        <Route path='/invite' element={<InviteProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
