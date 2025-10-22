import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import App from './App'
import { TaskDetails } from './pages/taskDetails'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetails />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            color: '#00abc5',
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
