import * as I from '../assets/icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { DashboardCard } from './dashboardCard'

export const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

  const inProgressTasks =
    tasks?.filter((task) => task.status === 'in_progress').length || 0
  const completedTasks =
    tasks?.filter((task) => task.status === 'done').length || 0
  const totalTasks = tasks?.length || 0
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3">
      <DashboardCard
        icon={<I.LayoutListIcon />}
        mainText={totalTasks}
        secondaryText="Tarefas disponíveis"
      />
      <DashboardCard
        icon={<I.CheckTasksIcon />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />
      <DashboardCard
        icon={<I.LoaderIcon />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />
      {/* <DashboardCard
        icon={<I.GlassWaterIcon />}
        mainText="40%"
        secondaryText="Água"
      /> */}
    </div>
  )
}
