import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Task Management System
          </h1>

          <p className="text-gray-600 mt-2">
            Kelola tugas dengan mudah menggunakan React dan Redux Toolkit.
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-10">
          <TaskForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-gray-200 rounded-2xl p-5">
            <TaskList status="To-Do" />
          </div>

          <div className="bg-blue-50 rounded-2xl p-5">
            <TaskList status="In Progress" />
          </div>

          <div className="bg-green-50 rounded-2xl p-5">
            <TaskList status="Done" />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard