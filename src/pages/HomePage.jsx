import { Dashboard } from '../components/Dashboard'
import { Sidebar } from '../components/Sidebar'

export const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
    </div>
  )
}
