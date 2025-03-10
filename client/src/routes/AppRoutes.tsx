import LoginPage from '@/pages/auth/LoginPage'
import HomePage from '@/pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='auth'>
          <Route path='login' index element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
