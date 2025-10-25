import { useLocation } from 'react-router-dom'

import { CheckTasksIcon, EditIcon, HomeIcon } from '../assets/icons'
import { SidebarButton } from './SidebarButton'

export const Sidebar = () => {
  const location = useLocation()
  const isOnTaskDetail = location.pathname.startsWith('/task/')

  return (
    <div className="h-screen w-72 min-w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p className="text-sm">
          Seu{' '}
          <span className="text-sm font-semibold text-brand-primary">
            organizador de tarefas
          </span>{' '}
          rápido e inteligente.
        </p>
      </div>

      <div>
        <div className="flex flex-col gap-2 p-2">
          <SidebarButton to="/" disabled={isOnTaskDetail}>
            <HomeIcon />
            Início
          </SidebarButton>

          <SidebarButton to="/tasks" disabled={isOnTaskDetail}>
            <CheckTasksIcon />
            Minhas tarefas
          </SidebarButton>

          {isOnTaskDetail && (
            <SidebarButton to={location.pathname}>
              <EditIcon />
              Detalhes da tarefa
            </SidebarButton>
          )}
        </div>
      </div>
    </div>
  )
}
