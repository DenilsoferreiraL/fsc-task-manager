import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import * as I from '../assets/icons/index'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { InputLabel } from '../components/InputLabel'
import { Sidebar } from '../components/Sidebar'
import { TimeSelect } from '../components/TimeSelect'

export const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      setTask(data)
      console.log(data)
    }
    fetchTask()
  }, [taskId])
  return (
    <div className="flex">
      <Sidebar />
      {/* cabeçalho */}
      <div className="w-full px-8 py-16">
        {/* Botão voltar - agora direto aqui */}
        <button
          onClick={handleBackClick}
          className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary transition hover:opacity-70"
        >
          <I.ArrowLeftIcon />
        </button>
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
        {/* barra topo */}
        <div className="flex items-start justify-between pb-5 pt-1">
          <h1 className="text-2xl font-semibold">{task?.title}</h1>
          <Button color="danger" className="h-fit">
            <I.TrashIcon />
            Deletar tarefa
          </Button>
        </div>
        {/* dados da tarefa */}
        <div className="space-y-4 rounded-xl bg-brand-white p-6">
          <div>
            <Input id="title" label="Titulo" value={task?.title} />
          </div>

          <div>
            <TimeSelect />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição*"
              value={task?.description}
            />
          </div>
        </div>
        {/* botoes cancelar  e salvar */}
        <div className="flex w-full justify-end gap-3 pt-4">
          <Button size="large" color="secondary">
            Cancelar
          </Button>
          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
