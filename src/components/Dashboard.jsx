import * as I from '../assets/icons'
import { AddTaskDialog } from '../components/AddTaskDialog'
import { Button } from '../components/Button'

export const Dashboard = () => {
  return (
    <div className="w-full space-y-6 bg-brand-secondary px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Início
          </span>
          <h2 className="text-xl font-semibold">Início</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost" text="Limpar tarefas">
            Limpar tarefas
            <I.TrashIcon />
          </Button>
          <Button>
            Nova tarefa
            <I.AddIcon />
          </Button>
          <AddTaskDialog />
        </div>
      </div>
    </div>
  )
}
