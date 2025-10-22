import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskMutationKeys } from '../../Keys/mutations'
import { taskQueryKeys } from '../../Keys/queries'
import { api } from '../../lib/axios'

export const useUpdatedTask = (taskId, onSuccessNavigate) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (formData) => {
      const { data: updatedTask } = await api.patch(
        `/tasks/${taskId}`,
        {
          title: formData.title.trim(),
          time: formData.time,
          description: formData.description.trim(),
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      return updatedTask
    },
    onSuccess: (data) => {
      // Atualiza o cache da task específica
      queryClient.setQueryData([taskQueryKeys.getAll(), taskId], data)

      // Atualiza a lista de tasks se estiver no cache
      queryClient.setQueryData(taskQueryKeys.getOne(), (old = []) =>
        old.map((t) => (t.id === taskId ? data : t))
      )

      toast.success('Tarefa salva com sucesso!')

      if (onSuccessNavigate) onSuccessNavigate()
    },
    onError: () => {
      toast.error('Ocorreu um erro ao salvar a tarefa.')
    },
  })
}
