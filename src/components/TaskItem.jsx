import CheckIcon from '../assets/icons/check.svg?react'
import LoaderCircleIcon from '../assets/icons/loader-circle.svg?react'
import DetailIcon from '../assets/icons/detail.svg?react'

export const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB51A] text-[#002C2E]'
    }

    if (task.status === 'in-progress') {
      return 'bg-[#FFAA041A] text-[#FFAA04]'
    }

    if (task.status === 'not-started') {
      return 'bg-[#35383E0D] text-[#35383E]'
    }
  }

  const getCheckboxClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB5] opacity-100'
    }

    if (task.status === 'in-progress') {
      return 'bg-[#FFAA04] opacity-100'
    }

    if (task.status === 'not-started') {
      return 'bg-[#35383E] opacity-10'
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
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
          />
          {task.status === 'done' && <CheckIcon className="animate-pulse" />}
          {task.status === 'in-progress' && (
            <LoaderCircleIcon className="animate-spin" />
          )}
        </label>

        {task.title}
      </div>
      <a href="#" className="transition hover:opacity-75">
        <DetailIcon />
      </a>
    </div>
  )
}
