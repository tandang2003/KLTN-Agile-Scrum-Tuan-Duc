import AppRoutes from '@/routes/AppRoutes'
import { Providers } from '@/providers'

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  )
}

export default App
