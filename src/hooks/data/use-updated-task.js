import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export const useUpdatedTask = (taskId, onSuccessNavigate) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData) => {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
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
      queryClient.setQueryData(['task', taskId], data)

      // Atualiza a lista de tasks se estiver no cache
      queryClient.setQueryData(['tasks'], (old = []) =>
        old.map((t) => (t.id === taskId ? data : t))
      )

      toast.success('Tarefa salva com sucesso!')

      // Navegação opcional passada pelo componente
      if (onSuccessNavigate) onSuccessNavigate()
    },
    onError: () => {
      toast.error('Ocorreu um erro ao salvar a tarefa.')
    },
  })
}
