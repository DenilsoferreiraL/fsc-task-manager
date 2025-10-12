import './AddTaskDialog.css'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import { Button } from './Button'
import { Input } from './Input'

export const AddTaskDialog = ({ isOpen, handleClose }) => {
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
            <Input id="title" label="Titulo" placeholder="Título de tarefa" />
            <Input id="time" label="Horário" placeholder="Selecione" />
            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
            />
            <div className="flex gap-3">
              <Button
                className="w-full bg-[#EEEEEE] text-[#030404]"
                size="large"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button className="w-full" variant="primary" size="large">
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
