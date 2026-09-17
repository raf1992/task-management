import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    {
      id: 1,
      title: 'Learn React',
      description: 'Study components and hooks',
      priority: 'High',
      status: 'To-Do',
    },
    {
      id: 2,
      title: 'Learn Redux',
      description: 'Understand state management with Redux',
      priority: 'Medium',
      status: 'In Progress',
    },
  ],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      )
    },

    editTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )

      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
  },
})

export const {
  addTask,
  deleteTask,
  editTask,
} = tasksSlice.actions

export default tasksSlice.reducer