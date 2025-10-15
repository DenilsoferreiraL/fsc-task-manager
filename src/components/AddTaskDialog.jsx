import './AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import { Button } from './Button'
import { Input } from './Input'
import { TimeSelect } from './TimeSelect'

export const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const titleRef = useRef(null)
  const timeRef = useRef(null)
  const descriptionRef = useRef(null)

  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (!isOpen) {
      if (titleRef.current) titleRef.current.value = ''
      if (timeRef.current) timeRef.current.value = ''
      if (descriptionRef.current) descriptionRef.current.value = ''
      setErrors([])
    }
  }, [isOpen])

  const handleSaveClick = () => {
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

    if (newErrors.length > 0) return

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    })

    handleClose()
  }

  const nodeRef = useRef(null)
  const titleError = errors.find((e) => e.inputName === 'title')
  const timeError = errors.find((e) => e.inputName === 'time')
  const descriptionError = errors.find((e) => e.inputName === 'description')

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
          <h2 className="text-2xl font-semibold text-brand-dark-blue">
            Nova Tarefa
          </h2>
          <p className="mb-4 mt-1 text-sm text-brand-text-gray">
            Insira as informações abaixo
          </p>

          <div className="flex w-[366px] flex-col space-y-4">
            <Input
              id="title"
              label="Titulo*"
              placeholder="Título de tarefa"
              ref={titleRef}
              errorMessage={titleError?.message}
            />

            <TimeSelect ref={timeRef} errorMessage={timeError?.message} />

            <Input
              id="description"
              placeholder="Descreva a tarefa"
              label="Descrição*"
              ref={descriptionRef}
              errorMessage={descriptionError?.message}
            />

            <div className="flex gap-3">
              <Button
                className="w-full bg-brand-light-gray"
                size="large"
                onClick={() => handleClose()}
                color="ghost"
              >
                Cancelar
              </Button>
              <Button
                className="w-full"
                color="primary"
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}
