import * as I from '../assets/icons'
import { useTasksLogic } from '../hooks/data/use-tasks-logic'
import { TaskItem } from './TaskItem'
import { TasksSeparator } from './TasksSeparator'

export const TasksPreview = () => {
  const { tasks, handleTaskCheckboxClick } = useTasksLogic()

  const morningTasks = tasks?.filter((t) => t.time === 'morning')
  const afternoonTasks = tasks?.filter((t) => t.time === 'afternoon')
  const eveningTasks = tasks?.filter((t) => t.time === 'evening')

  return (
    <div className="scrollbar-basic max-h-[460px] space-y-6 overflow-y-auto rounded-lg bg-white p-4 shadow-sm">
      {/* manhã */}
      <div className="space-y-2">
        <TasksSeparator title="Manhã" icon={<I.SunIcon />} />
        {morningTasks?.length ? (
          morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))
        ) : (
          <p className="text-center text-sm text-brand-text-gray">
            Nenhuma tarefa cadastrada para a manhã.
          </p>
        )}
      </div>

      {/* tarde */}
      <div className="space-y-2">
        <TasksSeparator title="Tarde" icon={<I.CloudSunIcon />} />
        {afternoonTasks?.length ? (
          afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))
        ) : (
          <p className="text-center text-sm text-brand-text-gray">
            Nenhuma tarefa cadastrada para a tarde.
          </p>
        )}
      </div>

      {/* noite */}
      <div className="space-y-2">
        <TasksSeparator title="Noite" icon={<I.NightIcon />} />
        {eveningTasks?.length ? (
          eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))
        ) : (
          <p className="text-center text-sm text-brand-text-gray">
            Nenhuma tarefa cadastrada para a noite.
          </p>
        )}
      </div>
    </div>
  )
}
