import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Draggable } from '@hello-pangea/dnd'

import {
  deleteTask,
  editTask,
} from '../features/tasks/tasksSlice'

function getPriorityStyle(priority) {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-700 border-red-300'

    case 'Medium':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300'

    case 'Low':
      return 'bg-green-100 text-green-700 border-green-300'

    default:
      return 'bg-gray-100 text-gray-700 border-gray-300'
  }
}

function TaskCard({ task, index }) {
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState(false)

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus] = useState(task.status)

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  const handleEdit = () => {
    if (!title.trim()) {
      alert('Title wajib diisi!')
      return
    }

    dispatch(
      editTask({
        id: task.id,
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
      })
    )

    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(task.title)
    setDescription(task.description)
    setPriority(task.priority)
    setStatus(task.status)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 mb-4">
        <h3 className="text-xl font-bold mb-4">
          Edit Task
        </h3>

        <label className="block font-semibold mb-1">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <label className="block font-semibold mb-1">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <label className="block font-semibold mb-1">
          Priority
        </label>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="block font-semibold mb-1">
          Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-5"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Save
          </button>

          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <Draggable
      draggableId={String(task.id)}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            p-5
            rounded-xl
            border
            mb-4
            transition-all
            cursor-grab
            active:cursor-grabbing
            ${getPriorityStyle(task.priority)}
            ${
              snapshot.isDragging
                ? 'shadow-2xl scale-105 rotate-1'
                : 'shadow-md'
            }
          `}
        >
          <h3 className="text-lg font-bold mb-2">
            {task.title}
          </h3>

          <p className="text-sm mb-4">
            {task.description || 'Tidak ada deskripsi'}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-white/70 text-xs font-bold">
              {task.priority}
            </span>

            <span className="text-xs font-semibold">
              {task.status}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard