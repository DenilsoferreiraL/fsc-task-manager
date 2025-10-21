import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import * as I from '../assets/icons'
import { AddTaskDialog } from './AddTaskDialog'
import { Button } from './Button'
import { TaskItem } from './TaskItem'
import { TasksSeparator } from './TasksSeparator'

export const Tasks = () => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { data: tasks } = useQuery({
    queryKey: 'tasks',
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      })
      const tasks = await response.json()
      return tasks
    },
  })

  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')

  const handleTaskCheckboxClick = async (taskId) => {
    const newTasks = tasks?.map((task) => {
      if (task.id !== taskId) return task

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!')
        return { ...task, status: 'in_progress' }
      } else if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!')
        return { ...task, status: 'done' }
      } else if (task.status === 'done') {
        toast.info('Tarefa reiniciada com sucesso!')
        return { ...task, status: 'not_started' }
      }
      return task
    })
    queryClient.setQueriesData('tasks', newTasks)

    const updatedTask = newTasks.find((t) => t.id === taskId)

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: updatedTask.status }),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar tarefa no servidor')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar o status da tarefa!')
    }
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
          />
        </div>
      </div>

      {/* List task */}

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title={'Manhã'} icon={<I.SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator title={'Tarde'} icon={<I.CloudSunIcon />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator title={'Noite'} icon={<I.NightIcon />} />
          {eveningTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da noite.
            </p>
          )}
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
