import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import * as I from '../assets/icons/index'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Sidebar } from '../components/Sidebar'
import { TextArea } from '../components/TextArea'
import { TimeSelect } from '../components/TimeSelect'

export const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState(null)
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'GET',
        })
        const data = await response.json()
        setTask(data)
        reset(data)
      } catch (error) {
        console.error('Erro ao carregar tarefa:', error)
        toast.error('Erro ao carregar tarefa.')
      }
    }

    if (taskId) {
      fetchTask()
    }
  }, [taskId, reset])

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      }),
    })

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao salvar a tarefa.')
    }

    const newTask = await response.json()
    setTask(newTask)
    handleBackClick()
    toast.success('Tarefa salva com sucesso!')
  }

  // Deletar tarefa
  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Tarefa deletada com sucesso!')
        navigate('/')
      } else {
        throw new Error('Erro ao deletar tarefa')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao deletar a tarefa. Por favor, tente novamente.')
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full px-8 py-16">
        {/* Botão voltar */}
        <button
          onClick={handleBackClick}
          className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary transition hover:opacity-70"
        >
          <I.ArrowLeftIcon />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <span
            onClick={handleBackClick}
            className="cursor-pointer text-sm text-brand-text-gray hover:opacity-70"
          >
            Minhas tarefas
          </span>
          <I.ArrowRightIcon />
          <span className="text-sm font-semibold text-brand-primary">
            {task?.title}
          </span>
        </div>

        {/* Barra topo */}
        <div className="flex items-start justify-between pb-5 pt-1">
          <h1 className="text-2xl font-semibold">{task?.title}</h1>
          <Button color="danger" className="h-fit" onClick={handleDeleteTask}>
            <I.TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-4 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Titulo*"
                disabled={isSubmitting}
                {...register('title', {
                  required: ' O título é obrigatório.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio.'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                disabled={isSubmitting}
                {...register('time', {
                  required: 'O horário é obrigatório.',
                })}
                errorMessage={errors?.time?.message}
              />
            </div>

            <div>
              <TextArea
                id="description"
                label="Descrição*"
                disabled={isSubmitting}
                {...register('description', {
                  required: 'A descrição é obrigatória.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia.'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>

          {/* Botões cancelar e salvar */}
          <div className="flex w-full justify-center pt-4">
            {isSubmitting ? (
              <Button
                className="flex items-center justify-center"
                color="primary"
                size="large"
                disabled={isSubmitting}
              >
                <I.LoaderCircleIcon className="mr-2 animate-spin" />
                Salvando...
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
