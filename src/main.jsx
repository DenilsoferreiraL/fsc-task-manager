import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { Home } from './pages/Home'
import { TaskDetailsPage } from './pages/taskDetails'
import TasksPage from './pages/tasks'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/tasks',
    element: <TasksPage />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetailsPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            color: '#7C3AED',
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
