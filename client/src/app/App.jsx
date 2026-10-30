import { RouterProvider } from 'react-router-dom'
import { router } from "./router.jsx"
import { AuthProvider } from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: {
    retry: false,
    refetchOnWindowFocus: false
  }}
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App