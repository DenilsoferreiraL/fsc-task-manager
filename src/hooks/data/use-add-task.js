import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAddTask = (handleClose, reset) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (task) => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })
      if (!response.ok) throw new Error('Erro ao salvar tarefa')
      return response.json()
    },
    onSuccess: (task) => {
      queryClient.setQueryData('tasks', (oldTasks = []) => [...oldTasks, task])
      toast.success('Tarefa adicionada com sucesso!')
      handleClose()
      reset()
    },
    onError: () => {
      toast.error('Erro ao adicionar a tarefa. Por favor, tente novamente.')
    },
  })
}
