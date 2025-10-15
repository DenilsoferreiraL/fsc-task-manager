import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import * as I from '../assets/icons'
import { TASKS } from '../constants/tasks'
import { AddTaskDialog } from './AddTaskDialog'
import { Button } from './Button'
import { TaskItem } from './TaskItem'
import { TasksSeparator } from './TasksSeparator'

export const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      })
      const tasks = await response.json()
      setTasks(tasks)
    }
    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    toast.success('Tarefa removida com sucesso!')
    setTasks(newTasks)
  }

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!')
        return { ...task, status: 'in_progress' }
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!')
        return { ...task, status: 'done' }
      }

      if (task.status === 'done') {
        toast.info('Tarefa reiniciada com sucesso')
        return { ...task, status: 'not_started' }
      }
      return task
    })
    setTasks(newTasks)
  }

  const handleAddTaskSubmit = (task) => {
    setTasks([...tasks, task])
    toast.success('Tarefa adicionada com sucesso!')
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost" text="Limpar tarefas">
            Limpar tarefas
            <I.TrashIcon />
          </Button>
          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova tarefa
            <I.AddIcon />
          </Button>
          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      {/* List task */}

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title={'Manhã'} icon={<I.SunIcon />} />

          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator title={'Tarde'} icon={<I.CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator title={'Noite'} icon={<I.NightIcon />} />

          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
