import HomeIcon from '../assets/icons/home.svg?react'
import TasksIcon from '../assets/icons/tasks.svg?react'
import { SidebarButton } from './SidebarButton'

export const Sidebar = () => {
  return (
    <div className="h-screen w-72 min-w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p className="text-sm">
          Um simples{' '}
          <span className="text-sm font-semibold text-brand-primary">
            organizador de tarefas
          </span>
        </p>
      </div>

      <div>
        <div className="flex flex-col gap-2 p-2">
          <SidebarButton to={'/'}>
            <HomeIcon />
            Início
          </SidebarButton>
          <SidebarButton to={'/tasks'}>
            <TasksIcon />
            Minhas tarefas
          </SidebarButton>
        </div>
      </div>
    </div>
  )
}
