import './AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import { LoaderCircleIcon } from '../assets/icons'
import { useAddTask } from '../hooks/data/use-add-task'
import { Button } from './Button'
import { Input } from './Input'
import { TextArea } from './TextArea'
import { TimeSelect } from './TimeSelect'

export const AddTaskDialog = ({ isOpen, handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const { mutate } = useAddTask(handleClose, reset)
  const nodeRef = useRef(null)

  const handleSubmitToServer = (data) => {
    mutate({
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    })
  }

  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

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

          <form onSubmit={handleSubmit(handleSubmitToServer)}>
            <div className="flex w-[366px] flex-col space-y-4">
              <Input
                id="title"
                label="Título*"
                placeholder="Título da tarefa"
                disabled={isSubmitting}
                errorMessage={errors?.title?.message}
                {...register('title', {
                  required: 'O título é obrigatório.',
                  validate: (value) =>
                    value.trim() ? true : 'O título não pode ser vazio.',
                })}
              />

              <TimeSelect
                disabled={isSubmitting}
                errorMessage={errors?.time?.message}
                {...register('time', { required: 'O horário é obrigatório.' })}
              />

              <TextArea
                id="description"
                placeholder="Descreva a tarefa"
                label="Descrição*"
                disabled={isSubmitting}
                errorMessage={errors?.description?.message}
                {...register('description', {
                  required: 'A descrição é obrigatória.',
                  validate: (value) =>
                    value.trim() ? true : 'A descrição não pode ser vazia.',
                })}
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  size="large"
                  color="ghost"
                  className="w-full bg-brand-light-gray"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  size="large"
                  color="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <LoaderCircleIcon
                        className="mr-2 animate-spin"
                        color="disabled"
                      />
                      Salvando...
                    </div>
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}
