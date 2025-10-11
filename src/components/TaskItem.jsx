import * as I from '../assets/icons'
import { Button } from '../components/Button'

export const TaskItem = ({
  task,
  handleTaskCheckboxClick,
  handleTaskDeleteClick,
}) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB51A] text-[#002C2E]'
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA041A] text-[#FFAA04]'
    }

    if (task.status === 'not_started') {
      return 'bg-[#35383E0D] text-[#35383E]'
    }
  }

  const getCheckboxClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB5] opacity-100'
    }

    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04] opacity-100'
    }

    if (task.status === 'not_started') {
      return 'bg-[#35383E] opacity-10'
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${getStatusClasses()}`}
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
          {task.status === 'done' && <I.CheckIcon className="animate-pulse" />}
          {task.status === 'in_progress' && (
            <I.LoaderCircleIcon className="animate-spin" />
          )}
        </label>

        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => handleTaskDeleteClick(task.id)}>
          <I.TrashIcon className="text-[#9a9c9f]" />
        </Button>
        <a href="#" className="transition hover:opacity-75">
          <I.DetailIcon />
        </a>
      </div>
    </div>
  )
}
