import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext } from '@hello-pangea/dnd'

import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

import { editTask } from '../features/tasks/tasksSlice'

function Dashboard() {
  const dispatch = useDispatch()

  const tasks = useSelector(
    (state) => state.tasks.tasks
  )

  const handleDragEnd = (result) => {
    const {
      destination,
      source,
      draggableId,
    } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const task = tasks.find(
      (task) =>
        String(task.id) === String(draggableId)
    )

    if (!task) {
      return
    }

    dispatch(
      editTask({
        ...task,
        status: destination.droppableId,
      })
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Task Management System
          </h1>

          <p className="text-gray-600 mt-2">
            Kelola tugas dengan mudah menggunakan React,
            Redux Toolkit, dan Drag & Drop.
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-10">
          <TaskForm />
        </div>

        <DragDropContext
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TaskList status="To-Do" />

            <TaskList status="In Progress" />

            <TaskList status="Done" />

          </div>
        </DragDropContext>

      </div>
    </div>
  )
}

export default Dashboard