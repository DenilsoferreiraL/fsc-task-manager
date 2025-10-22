import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskQueryKeys } from '../../Keys/queries'
import { api } from '../../lib/axios'

export const useAddTask = (handleClose, reset) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['tasks', 'add'],
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post('/tasks', task)
      return createdTask
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks = []) => [
        ...oldTasks,
        newTask,
      ])

      toast.success('Tarefa adicionada com sucesso!')
      handleClose()
      reset()
    },
    onError: () => {
      toast.error('Erro ao adicionar a tarefa. Por favor, tente novamente.')
    },
  })
}
