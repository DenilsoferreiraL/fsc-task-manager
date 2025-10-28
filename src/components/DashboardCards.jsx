import { useGetTasks } from '../hooks/data/use-get-tasks'
import { CardItem } from './CardItem'
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
      <CardItem
        icon={
          <Icon src="/assets/icons/layout-list.svg" alt="Lista de tarefas" />
        }
        mainText={totalTasks}
        secondaryText="Tarefas disponíveis"
      />

      <CardItem
        icon={
          <Icon src="/assets/icons/check-tasks.svg" alt="Tarefas concluídas" />
        }
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />

      <CardItem
        icon={
          <Icon src="/assets/icons/loader.svg" alt="Tarefas em andamento" />
        }
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />

      {/* <CardItem
        icon={<Icon src={GlassWaterIcon} alt="Água" />}
        mainText="40%"
        secondaryText="Água"
      /> */}
    </div>
  )
}
