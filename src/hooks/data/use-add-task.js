import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export const useAddTask = (handleClose, reset) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['tasks', 'add'],
    mutationFn: async (task) => {
      const { data: createdTask } = await axios.post(
        'http://localhost:3000/tasks',
        task
      )
      return createdTask
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks = []) => [
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
