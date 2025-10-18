import './AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import * as I from '../assets/icons'
import { Button } from './Button'
import { Input } from './Input'
import { TextArea } from './TextArea'
import { TimeSelect } from './TimeSelect'

export const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleSubmitToServer = async (task) => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })

      if (!response.ok) {
        throw new Error('Erro ao adicionar tarefa')
      }

      const newTask = await response.json()
      onSubmitSuccess(newTask)
      reset()
      handleClose()
      toast.success('Tarefa adicionada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao adicionar a tarefa. Por favor, tente novamente.')
    }
  }

  const handleSaveClick = async (task) => {
    const newTask = {
      id: v4(),
      title: task.title,
      time: task.time,
      description: task.description,
      status: task.status || 'not_started',
    }

    return handleSubmitToServer(newTask)
  }

  const nodeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
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

          <form onSubmit={handleSubmit(handleSaveClick)}>
            <div className="flex w-[366px] flex-col space-y-4">
              <Input
                id="title"
                label="Título*"
                placeholder="Título da tarefa"
                disabled={isSubmitting}
                {...register('title', {
                  required: 'O título é obrigatório.',
                  validate: (value) =>
                    value.trim() ? true : 'O título não pode ser vazio.',
                })}
                errorMessage={errors?.title?.message}
              />

              <TimeSelect
                disabled={isSubmitting}
                {...register('time', {
                  required: 'O horário é obrigatório.',
                })}
                errorMessage={errors?.time?.message}
              />

              <TextArea
                id="description"
                placeholder="Descreva a tarefa"
                label="Descrição*"
                disabled={isSubmitting}
                {...register('description', {
                  required: 'A descrição é obrigatória.',
                  validate: (value) =>
                    value.trim() ? true : 'A descrição não pode ser vazia.',
                })}
                errorMessage={errors?.description?.message}
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  className="w-full bg-brand-light-gray"
                  size="large"
                  onClick={handleClose}
                  color="ghost"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>

                <Button
                  className="w-full"
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <I.LoaderCircleIcon
                        color="disabled"
                        className="mr-2 animate-spin"
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
  onSubmitSuccess: PropTypes.func.isRequired,
}
