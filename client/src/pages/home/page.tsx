import Container from '@/components/Container'
import Header from '@/components/Header'
import { Navigate } from 'react-router-dom'
const HomePage = () => {
  return (
    <>
      <Header />
      <Container>
        <Navigate to='/auth/login' replace />
      </Container>
    </>
  )
}

export default HomePage
