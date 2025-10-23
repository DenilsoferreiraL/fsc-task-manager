import { DashboardCards } from './DashboardCards'
import { Header } from './Header'
import { TasksPreview } from './TasksPreview'

export const Dashboard = () => {
  return (
    <div className="w-full space-y-4 bg-brand-secondary px-8 py-16">
      <Header subtitle="Início" title="Início" />
      <DashboardCards />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr]">
        {/* box left */}
        <div className="flex items-center justify-center rounded-2xl bg-brand-white px-6 py-4 text-center shadow-md">
          <p className="text-sm font-medium leading-relaxed text-brand-primary md:text-base lg:text-lg">
            “Tudo posso naquele que me fortalece.”{' '}
            <br className="hidden md:block" />
            <span className="text-brand-gray text-xs">– Filipenses 4:13</span>
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <h3 className="mb-1 text-2xl font-semibold text-brand-primary">
            Tarefas
          </h3>
          <p className="mb-2 text-sm text-brand-dark-gray">
            Resumo das tarefas disponíveis
          </p>
          <TasksPreview />
        </div>

        {/* box right */}
        {/* <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <h3 className="mb-1 text-xl font-semibold">Água</h3>
          <p className="mb-4 text-sm text-brand-dark-gray">
            Beba sua meta diária de água
          </p>
        </div> */}
      </div>
    </div>
  )
}
