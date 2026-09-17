import { useSelector } from 'react-redux'
import TaskCard from './TaskCard'

function TaskList({ status }) {
  const tasks = useSelector(
    (state) => state.tasks.tasks
  )

  const filteredTasks = tasks.filter(
    (task) => task.status === status
  )

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          {status}
        </h2>

        <span className="bg-gray-300 px-2.5 py-1 rounded-full text-xs font-bold">
          {filteredTasks.length}
        </span>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="bg-white/60 rounded-xl p-6 text-center">
          <p className="text-gray-500">
            No tasks
          </p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))
      )}
    </div>
  )
}

export default TaskList