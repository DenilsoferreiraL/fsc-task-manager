import { CheckTasksIcon, LayoutListIcon, LoaderIcon } from '../assets/icons'
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
        icon={<img src={LayoutListIcon} alt="Adicionar" />}
        mainText={totalTasks}
        secondaryText="Tarefas disponíveis"
      />
      <DashboardCard
        icon={<img src={CheckTasksIcon} alt="Adicionar" />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />
      <DashboardCard
        icon={<img src={LoaderIcon} alt="Adicionar" />}
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
