import {QueryClient, QueryClientProvider} from 'react-query'
import PageRoutes from './router/PageRoutes'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <PageRoutes/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
