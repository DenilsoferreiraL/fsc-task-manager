import { createPortal } from 'react-dom'

export const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center text-black backdrop-blur-md backdrop-brightness-75">
      <div className="items-center rounded-lg bg-white p-5 text-center">
        <h2 className="text-2xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mt-1 text-[#9A9C9F]">Insira as informações abaixo</p>
      </div>
    </div>,
    document.body
  )
}
