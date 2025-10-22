import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export const useGetTasks = (taskId) => {
  const queryKey = taskId ? ['task', taskId] : ['tasks']
  const url = taskId
    ? `http://localhost:3000/tasks/${taskId}`
    : 'http://localhost:3000/tasks'

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data: getTask } = await axios.get(url, taskId)

      return getTask
    },
    enabled: !!url,
    onError: () => toast.error('Erro ao carregar tarefa(s)'),
  })
}
