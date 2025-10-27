import CloudSunIcon from '../assets/icons/cloud-sun.svg'
import NightIcon from '../assets/icons/night.svg'
import SunIcon from '../assets/icons/sun.svg'
import { useTasksLogic } from '../hooks/data/use-tasks-logic'
import { Icon } from './Icon'
import { TaskItem } from './TaskItem'
import { TasksSeparator } from './TasksSeparator'

export const Tasks = () => {
  const { tasks, handleTaskCheckboxClick } = useTasksLogic()

  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')

  return (
    <div className="scrollbar-basic max-h-[768px] w-full space-y-6 overflow-y-auto bg-brand-secondary shadow-md">
      <div className="rounded-lg bg-brand-white p-6">
        <div className="space-y-3">
          <TasksSeparator
            title="Manhã"
            icon={<Icon src={SunIcon} alt="Sol" />}
          />
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator
            title="Tarde"
            icon={<Icon src={CloudSunIcon} alt="Nublado" />}
          />
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator
            title="Noite"
            icon={<Icon src={NightIcon} alt="Noite" />}
          />
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
