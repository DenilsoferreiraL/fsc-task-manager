import CheckTasksIcon from '../assets/icons/check-tasks.svg'
import LayoutListIcon from '../assets/icons/layout-list.svg'
import LoaderIcon from '../assets/icons/loader.svg'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { DashboardCard } from './DashboardCard'
import { Icon } from './Icon'

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
        icon={<Icon src={LayoutListIcon} alt="Lista de tarefas" />}
        mainText={totalTasks}
        secondaryText="Tarefas disponíveis"
      />

      <DashboardCard
        icon={<Icon src={CheckTasksIcon} alt="Tarefas concluídas" />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />

      <DashboardCard
        icon={<Icon src={LoaderIcon} alt="Tarefas em andamento" />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />

      {/* <DashboardCard
        icon={<Icon src={GlassWaterIcon} alt="Água" />}
        mainText="40%"
        secondaryText="Água"
      /> */}
    </div>
  )
}
