import { DashboardCards } from './DashboardCards'
import { Header } from './Header'
import { Tasks } from './Tasks'

export const Dashboard = () => {
  return (
    <div className="w-full space-y-6 bg-brand-secondary px-8 py-16">
      <Header subtitle="Início" title="Início" />
      <DashboardCards />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* box left */}
        <div className="space-y-4">
          <Tasks />
        </div>
        {/* box right */}
        <div className="space-y-4"></div>
      </div>
    </div>
  )
}
