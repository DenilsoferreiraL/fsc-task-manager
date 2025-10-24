import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskQueryKeys } from '../../Keys/queries'
import { useGetTasks } from './use-get-tasks'

export const useTasksLogic = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()

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

    queryClient.setQueriesData(taskQueryKeys.getAll(), newTasks)

    const updatedTask = newTasks.find((t) => t.id === taskId)

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedTask.status }),
      })
      if (!response.ok) throw new Error('Erro ao atualizar no servidor')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar o status da tarefa!')
    }
  }

  return { tasks, handleTaskCheckboxClick }
}
