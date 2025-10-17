import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import * as I from '../assets/icons/index'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Sidebar } from '../components/Sidebar'
import { TextArea } from '../components/TextArea' // NOVO COMPONENTE
import { TimeSelect } from '../components/TimeSelect'

export const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState([])
  const [hasLoaded, setHasLoaded] = useState(false) // CONTROLE DE CARREGAMENTO
  const navigate = useNavigate()

  // Refs para os inputs
  const titleRef = useRef(null)
  const timeRef = useRef(null)
  const descriptionRef = useRef(null)

  const handleBackClick = () => {
    navigate(-1)
  }

  // Função de validação
  const validateForm = () => {
    const title = titleRef.current?.value.trim() || ''
    const time = timeRef.current?.value.trim() || ''
    const description = descriptionRef.current?.value.trim() || ''

    const newErrors = []

    if (!title) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório.',
      })
    }

    if (!time) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório.',
      })
    }

    if (!description) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória.',
      })
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  // Atualizar tarefa
  const handleUpdateTask = async (taskData) => {
    setIsSaving(true)

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })

      if (response.ok) {
        const updatedTask = await response.json()
        setTask(updatedTask)
        toast.success('Tarefa atualizada com sucesso!')
        navigate('/')
      } else {
        throw new Error('Erro ao atualizar tarefa')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar a tarefa. Por favor, tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  // Salvar com validação
  const handleSaveClick = async () => {
    setErrors([])

    if (!validateForm()) {
      return
    }

    const title = titleRef.current?.value.trim() || ''
    const time = timeRef.current?.value.trim() || ''
    const description = descriptionRef.current?.value.trim() || ''

    const updatedTask = {
      title,
      time,
      description,
      status: task?.status || 'not_started',
    }

    await handleUpdateTask(updatedTask)
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

  // FUNÇÃO PARA SETAR VALORES NOS REFS
  const setFormValues = (taskData) => {
    if (titleRef.current) titleRef.current.value = taskData.title || ''
    if (timeRef.current) timeRef.current.value = taskData.time || ''
    if (descriptionRef.current)
      descriptionRef.current.value = taskData.description || ''
  }

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'GET',
        })
        const data = await response.json()
        setTask(data)

        // AGUARDA O RENDER PARA SETAR OS VALORES
        setTimeout(() => {
          setFormValues(data)
          setHasLoaded(true)
        }, 0)
      } catch (error) {
        console.error('Erro ao carregar tarefa:', error)
        toast.error('Erro ao carregar tarefa.')
      } finally {
        setIsLoading(false)
      }
    }

    if (taskId) {
      fetchTask()
    }
  }, [taskId])

  // Encontrar mensagens de erro
  const titleError = errors.find((e) => e.inputName === 'title')
  const timeError = errors.find((e) => e.inputName === 'time')
  const descriptionError = errors.find((e) => e.inputName === 'description')

  if (isLoading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex w-full items-center justify-center px-8 py-16">
          <div className="flex items-center gap-2">
            <I.LoaderCircleIcon className="animate-spin" />
            <span>Carregando tarefa...</span>
          </div>
        </div>
      </div>
    )
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
          <Button
            color="danger"
            className="h-fit"
            onClick={handleDeleteTask}
            disabled={isSaving}
          >
            <I.TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* Formulário */}
        <div className="space-y-4 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Titulo*"
              ref={titleRef}
              errorMessage={titleError?.message}
              disabled={isSaving}
              key={`title-${hasLoaded}`}
            />
          </div>

          <div>
            <TimeSelect
              ref={timeRef}
              errorMessage={timeError?.message}
              disabled={isSaving}
              key={`time-${hasLoaded}`}
            />
          </div>

          <div>
            <TextArea
              id="description"
              label="Descrição*"
              ref={descriptionRef}
              errorMessage={descriptionError?.message}
              disabled={isSaving}
              key={`description-${hasLoaded}`}
            />
          </div>
        </div>

        {/* Botões cancelar e salvar */}
        <div className="flex w-full justify-end gap-3 pt-4">
          <Button
            size="large"
            color="secondary"
            onClick={handleBackClick}
            disabled={isSaving}
          >
            Cancelar
          </Button>

          {isSaving ? (
            <Button
              className="flex items-center justify-center"
              color="primary"
              size="large"
              disabled
            >
              <I.LoaderCircleIcon className="mr-2 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button size="large" color="primary" onClick={handleSaveClick}>
              Salvar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
