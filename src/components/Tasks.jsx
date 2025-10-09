import { Button } from './Button'
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import { InfoDay } from './InfoDay'
import SunIcon from '../assets/icons/sun.svg?react'
import CloudSunIcon from '../assets/icons/cloud-sun.svg?react'
import NightIcon from '../assets/icons/night.svg?react'

export const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00abc5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" text="Limpar tarefas">
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button>
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      {/* List task */}

      <div className="rounde-xl bg-white p-6">
        <div className="space-y-3">
          <InfoDay>
            <SunIcon className="text-[#9A9C9F]" />
            Manhã
          </InfoDay>
        </div>
        <div className="my-6 space-y-3">
          <InfoDay>
            <CloudSunIcon className="text-[#9A9C9F]" />
            Tarde
          </InfoDay>
        </div>
        <div className="space-y-3">
          <InfoDay>
            <NightIcon className="text-[#9A9C9F]" />
            Noite
          </InfoDay>
        </div>
      </div>
    </div>
  )
}
