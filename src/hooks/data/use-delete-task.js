import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { taskMutationKeys } from '../../Keys/mutations'
import { taskQueryKeys } from '../../Keys/queries'
import { api } from '../../lib/axios'

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`/tasks/${taskId}`, taskId)

      return deleteTask
    },
    onSuccess: (deletedTask) => {
      // Atualiza cache local removendo a task pelo id
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks = []) =>
        oldTasks.filter((task) => task.id !== deletedTask.id)
      )

      toast.success('Tarefa deletada com sucesso!')
      navigate('/tasks')
    },
    onError: () => {
      toast.error('Erro ao deletar a tarefa. Por favor, tente novamente.')
    },
  })
}
