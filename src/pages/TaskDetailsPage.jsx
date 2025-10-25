import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LoaderCircleIcon,
  TrashIcon,
} from '../assets/icons'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Sidebar } from '../components/Sidebar'
import { TextArea } from '../components/TextArea'
import { TimeSelect } from '../components/TimeSelect'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { useUpdatedTask } from '../hooks/data/use-updated-task'

export const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  //Lista as tarefas
  const { data: task, isLoading } = useGetTasks(taskId)

  useEffect(() => {
    if (task) reset(task)
  }, [task, reset])

  //Atualiza as tarefas
  const updateTask = useUpdatedTask(taskId, () => navigate(-1))

  //Deleta as tarefas
  const deleteTask = useDeleteTask(taskId)

  const handleBackClick = () => navigate(-1)
  const handleSaveClick = (data) => updateTask.mutate(data)
  const handleDeleteTask = () => deleteTask.mutate()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando tarefa...</p>
      </div>
    )
  }

  return (
    <div className="flex bg-brand-secondary">
      <Sidebar />
      <div className="w-full px-8 py-16">
        {/* Botão voltar */}
        <button
          onClick={handleBackClick}
          className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary transition hover:opacity-70"
        >
          <ArrowLeftIcon />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <span
            onClick={handleBackClick}
            className="cursor-pointer text-sm text-brand-dark-gray hover:opacity-70"
          >
            Minhas tarefas
          </span>
          <ArrowRightIcon />
          <span className="text-sm font-semibold text-brand-primary">
            {task?.title}
          </span>
        </div>

        {/* Barra topo */}
        <div className="flex items-start justify-between pb-5 pt-1">
          <h1 className="text-2xl font-semibold">{task?.title}</h1>
          <Button
            color="danger"
            className="h-fit"
            onClick={handleDeleteTask}
            disabled={deleteTask.isPending}
          >
            {deleteTask.isPending ? (
              <>
                <LoaderCircleIcon className="mr-2 animate-spin" />
                Deletando...
              </>
            ) : (
              <>
                <TrashIcon />
                Deletar tarefa
              </>
            )}
          </Button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-4 rounded-xl bg-brand-white p-6">
            <Input
              id="title"
              label="Título*"
              disabled={isSubmitting || updateTask.isPending}
              {...register('title', {
                required: 'O título é obrigatório.',
                validate: (value) =>
                  value.trim() ? true : 'O título não pode ser vazio.',
              })}
              errorMessage={errors?.title?.message}
            />

            <TimeSelect
              disabled={isSubmitting || updateTask.isPending}
              {...register('time', {
                required: 'O horário é obrigatório.',
              })}
              errorMessage={errors?.time?.message}
            />

            <TextArea
              id="description"
              label="Descrição*"
              disabled={isSubmitting || updateTask.isPending}
              {...register('description', {
                required: 'A descrição é obrigatória.',
                validate: (value) =>
                  value.trim() ? true : 'A descrição não pode ser vazia.',
              })}
              errorMessage={errors?.description?.message}
            />
          </div>

          {/* Botões */}
          <div className="flex w-full justify-center pt-4">
            {updateTask.isPending ? (
              <Button
                className="flex items-center justify-center"
                color="primary"
                size="large"
                disabled
              >
                Salvar
              </Button>
            ) : (
              <Button size="large" color="primary" type="submit">
                Salvar
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
