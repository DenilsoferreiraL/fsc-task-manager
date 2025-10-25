import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  CheckIcon,
  DetailIcon,
  LoaderCircleIcon,
  TrashIcon,
} from '../assets/icons'
import { Button } from '../components/Button'
import { useDeleteTask } from '../hooks/data/use-delete-task'

export const TaskItem = ({ task, handleTaskCheckboxClick }) => {
  const { mutate, isPending } = useDeleteTask(task.id)

  const handleDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
      },
      OnError: () => {
        toast.error('Erro ao deletar tarefa!')
      },
    })
  }

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB51A] text-[#002C2E]'
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA041A] text-brand-process'
    }

    if (task.status === 'not_started') {
      return 'bg-[#35383E0D] text-brand-dark-blue'
    }
  }

  const getCheckboxClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-success opacity-100'
    }

    if (task.status === 'in_progress') {
      return 'bg-brand-process opacity-100'
    }

    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue opacity-10'
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm shadow-md transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-all ${getCheckboxClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            readOnly
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleTaskCheckboxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon className="animate-pulse" />}
          {task.status === 'in_progress' && (
            <LoaderCircleIcon className="animate-spin text-brand-white" />
          )}
        </label>

        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderCircleIcon className="text-brand-gray animate-spin" />
          ) : (
            <TrashIcon className="text-brand-danger" />
          )}
        </Button>
        <Link
          to={`/task/${task.id}`}
          className="rounded-lg bg-brand-white px-3 py-1 text-brand-primary shadow-md transition hover:opacity-75"
        >
          <DetailIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleTaskCheckboxClick: PropTypes.func.isRequired,
  handleTaskDeleteClick: PropTypes.func.isRequired,
}
