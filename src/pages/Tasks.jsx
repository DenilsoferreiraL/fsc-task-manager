import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Tasks } from '../components/Tasks'

function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-brand-secondary px-8 py-16">
        <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />

        {/* Corpo principal */}
        <div className="mt-6">
          <Tasks />
        </div>
      </div>
    </div>
  )
}

export default TasksPage
