import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskQueryKeys } from '../../Keys/queries'
import { api } from '../../lib/axios'

export const useGetTasks = (taskId) => {
  // Define a query key de acordo com a necessidade
  const queryKey = taskId
    ? taskQueryKeys.getOne(taskId)
    : taskQueryKeys.getAll()

  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = taskId ? `/tasks/${taskId}` : '/tasks'
      const { data } = await api.get(url)
      return data
    },
    onError: () => toast.error('Erro ao carregar tarefa(s)'),
  })
}
