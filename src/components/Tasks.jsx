import { Button } from './Button'
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import CloudSunIcon from '../assets/icons/cloud-sun.svg?react'
import NightIcon from '../assets/icons/night.svg?react'
import { TasksSeparator } from './TasksSeparator'
import { useState } from 'react'
import { TASKS } from '../constants/tasks'
import { TaskItem } from './TaskItem'

export const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)

  const clearTasks = () => {
    setTasks([])
  }

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00abc5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" text="Limpar tarefas" onClick={clearTasks}>
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button>
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      {/* List task */}

      <div className="rounde-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator>
            <SunIcon />
            Manhã
          </TasksSeparator>
          {morningTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator>
            <CloudSunIcon />
            Tarde
          </TasksSeparator>
          {afternoonTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator>
            <NightIcon />
            Noite
          </TasksSeparator>
          {eveningTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}
