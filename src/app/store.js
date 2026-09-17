import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'

const loadFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem('tasksState')

    if (!savedState) {
      return undefined
    }

    return JSON.parse(savedState)
  } catch (error) {
    console.error('Gagal membaca localStorage:', error)
    return undefined
  }
}

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem(
      'tasksState',
      JSON.stringify(state)
    )
  } catch (error) {
    console.error('Gagal menyimpan localStorage:', error)
  }
}

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: loadFromLocalStorage(),
})

store.subscribe(() => {
  saveToLocalStorage(store.getState())
})