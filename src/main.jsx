import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import App from './App'
import { TaskDetailsPage } from './pages/task-details'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetailsPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      toastOptions={{
        style: {
          color: '#00abc5',
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>
)
