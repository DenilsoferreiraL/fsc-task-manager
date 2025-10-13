import './AddTaskDialog.css'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { Button } from './Button'
import { Input } from './Input'
import { TimeSelect } from './TimeSelect'

export const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setTime('morning')
      setDescription('')
    }
  }, [isOpen])

  const [title, setTitle] = useState('')
  const [time, setTime] = useState('morning')
  const [description, setDescription] = useState('')

  const handleSaveClick = () => {
    if (!title.trim() || !time.trim() || !description.trim()) {
      return toast.error('Preencha todos os campos!')
    }

    {
      handleSubmit({
        id: v4(),
        title,
        time,
        description,
        status: 'not_started',
      })

      handleClose()
    }
  }

  const nodeRef = useRef(null)

  return createPortal(
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center text-black backdrop-blur-md backdrop-brightness-75"
      >
        <div className="items-center rounded-lg bg-white p-5 text-center">
          <h2 className="text-2xl font-semibold text-[#35383E]">Nova Tarefa</h2>
          <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">
            Insira as informações abaixo
          </p>

          <div className="flex w-[366px] flex-col space-y-4">
            <Input
              id="title"
              label="Titulo*"
              placeholder="Título de tarefa"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TimeSelect
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
            <Input
              id="description"
              placeholder="Descreva a tarefa"
              label="Descrição*"
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              value={description}
            />
            <div className="flex gap-3">
              <Button
                className="w-full bg-[#EEEEEE] text-[#010101]"
                size="large"
                onClick={() => handleClose()}
              >
                Cancelar
              </Button>
              <Button
                className="w-full"
                variant="primary"
                size="large"
                onClick={handleSaveClick}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}
