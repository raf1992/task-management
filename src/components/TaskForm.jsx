import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/tasks/tasksSlice'

function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [status, setStatus] = useState('To-Do')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    }

    dispatch(addTask(newTask))

    setTitle('')
    setDescription('')
    setPriority('Low')
    setStatus('To-Do')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-5">
        Add New Task
      </h2>

      <div className="mb-4">
        <label className="block font-semibold mb-2">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul task"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Masukkan deskripsi task"
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">
          Priority
        </label>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block font-semibold mb-2">
          Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  )
}

export default TaskForm