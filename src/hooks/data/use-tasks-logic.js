import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskQueryKeys } from '../../Keys/queries'
import { api } from '../../lib/axios'
import { useGetTasks } from './use-get-tasks'

export const useTasksLogic = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()

  const handleTaskCheckboxClick = async (taskId) => {
    // Encontra a tarefa atual
    const currentTask = tasks?.find((task) => task.id === taskId)
    if (!currentTask) return

    // Determina o próximo status
    let newStatus
    switch (currentTask.status) {
      case 'not_started':
        newStatus = 'in_progress'
        toast.success('Tarefa iniciada com sucesso!')
        break
      case 'in_progress':
        newStatus = 'done'
        toast.success('Tarefa concluída com sucesso!')
        break
      case 'done':
        newStatus = 'not_started'
        toast.info('Tarefa reiniciada com sucesso!')
        break
      default:
        return
    }

    // Otimistic update - atualiza o cache primeiro
    const updatedTasks = tasks?.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )

    queryClient.setQueryData(taskQueryKeys.getAll(), updatedTasks)

    try {
      // Usa o Axios configurado em vez de fetch
      await api.patch(`/tasks/${taskId}`, { status: newStatus })

      // Recarrega os dados para garantir sincronização
      await queryClient.invalidateQueries(taskQueryKeys.getAll())
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)

      // Reverte o optimistic update em caso de erro
      queryClient.setQueryData(taskQueryKeys.getAll(), tasks)
      toast.error('Erro ao atualizar o status da tarefa!')
    }
  }

  return { tasks, handleTaskCheckboxClick }
}
