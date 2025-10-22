import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useGetTasks = (taskId) => {
  const queryKey = taskId ? ['task', taskId] : ['tasks']
  const url = taskId
    ? `http://localhost:3000/tasks/${taskId}`
    : 'http://localhost:3000/tasks'

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Erro ao carregar tarefa(s)')
      return response.json()
    },
    enabled: !!url,
    onError: () => toast.error('Erro ao carregar tarefa(s)'),
  })
}
