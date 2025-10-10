export const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB51A]/10 text-[#002C2E]'
    }

    if (task.status === 'in-progress') {
      return 'bg-[#FFAA041A]/10 text-[#FFAA04]'
    }

    if (task.status === 'not-started') {
      return 'bg-[#35383E0D]/10 text-[#35383E]'
    }
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  )
}
