import { DashboardCards } from './DashboardCards'
import { Header } from './Header'
import { TasksPreview } from './TasksPreview'

export const Dashboard = () => {
  return (
    <div className="w-full space-y-6 bg-brand-secondary px-8 py-16">
      <Header subtitle="Início" title="Início" />
      <DashboardCards />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr,1fr]">
        {/* box left */}
        <div className="rounded-lg bg-white p-6">
          <h3 className="mb-1 text-xl font-semibold">Tarefas</h3>
          <p className="mb-4 text-sm text-brand-dark-gray">
            Resumo das tarefas disponíveis
          </p>
          <TasksPreview />
        </div>

        {/* box right */}
        <div className="rounded-lg bg-white p-6">
          <h3 className="mb-1 text-xl font-semibold">Água</h3>
          <p className="mb-4 text-sm text-brand-dark-gray">
            Beba sua meta diária de água
          </p>
        </div>
      </div>
    </div>
  )
}
