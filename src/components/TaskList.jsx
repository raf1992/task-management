import { useSelector } from 'react-redux'
import { Droppable } from '@hello-pangea/dnd'

import TaskCard from './TaskCard'

function TaskList({ status }) {
  const tasks = useSelector(
    (state) => state.tasks.tasks
  )

  const filteredTasks = tasks.filter(
    (task) => task.status === status
  )

  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`
            min-h-[350px]
            p-5
            rounded-2xl
            transition-all
            ${
              snapshot.isDraggingOver
                ? 'bg-blue-100 ring-2 ring-blue-400'
                : 'bg-gray-200'
            }
          `}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              {status}
            </h2>

            <span className="bg-white px-3 py-1 rounded-full text-sm font-bold">
              {filteredTasks.length}
            </span>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="border-2 border-dashed border-gray-400 rounded-xl p-8 text-center">
              <p className="text-gray-500">
                Drop task here
              </p>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
              />
            ))
          )}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default TaskList