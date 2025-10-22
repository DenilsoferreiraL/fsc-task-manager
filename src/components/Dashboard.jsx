import * as I from '../assets/icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { DashboardCard } from './dashboardCard'
import { Header } from './Header'
import { Tasks } from './Tasks'

export const Dashboard = () => {
  const { data: tasks } = useGetTasks()

  const inProgressTasks =
    tasks?.filter((task) => task.status === 'in_progress').length || 0
  const completedTasks =
    tasks?.filter((task) => task.status === 'done').length || 0
  const totalTasks = tasks?.length || 0

  return (
    <div className="w-full space-y-6 bg-brand-secondary px-8 py-16">
      <Header subtitle="Início" title="Início" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          icon={<I.LayoutListIcon className="text-brand-primary" />}
          mainText={totalTasks}
          secondaryText="Tarefas disponíveis"
        />
        <DashboardCard
          icon={<I.CheckTasksIcon className="text-brand-primary" />}
          mainText={completedTasks}
          secondaryText="Tarefas concluídas"
        />
        <DashboardCard
          icon={<I.LoaderIcon className="text-brand-primary" />}
          mainText={inProgressTasks}
          secondaryText="Tarefas em andamento"
        />
        <DashboardCard
          icon={<I.GlassWaterIcon className="text-brand-primary" />}
          mainText="40%"
          secondaryText="Água"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <Tasks />
        </div>

        <div className="space-y-4"></div>
      </div>
    </div>
  )
}
