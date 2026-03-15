import { useState, useEffect } from 'react'
import CreateTask from './components/CreateTask'
import TaskNote from './components/TaskNote'

interface Task {
  id: string
  title: string
  detail: string
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() =>
    loadFromStorage<Task[]>('taskmaster-tasks', [])
  )
  const [completedTasks, setCompletedTasks] = useState<Task[]>(() =>
    loadFromStorage<Task[]>('taskmaster-completed', [])
  )
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showCompleted, setShowCompleted] = useState(false)

  useEffect(() => {
    localStorage.setItem('taskmaster-tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('taskmaster-completed', JSON.stringify(completedTasks))
  }, [completedTasks])

  function handleSave(title: string, detail: string) {
    const newTask: Task = { id: crypto.randomUUID(), title, detail }
    setTasks(prev => [...prev, newTask])
    setEditingTask(null)
  }

  function handleDelete(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleEdit(task: Task) {
    setTasks(prev => prev.filter(t => t.id !== task.id))
    setEditingTask(task)
  }

  function handleComplete(task: Task) {
    setTasks(prev => prev.filter(t => t.id !== task.id))
    setCompletedTasks(prev => {
      const updated = [...prev, task]
      console.log('Completed tasks:', updated)
      return updated
    })
  }

  return (
    <>
      <div className='font-bold header text-2xl bg-orange-950 text-white px-20 py-10'>
        <i className='fa-solid fa-brain text-3xl mx-4'></i>
        Task Master!
      </div>

      <CreateTask onSave={handleSave} editingTask={editingTask} />

      {tasks.length === 0 ? (
        <p className='text-center italic text-[#40513B] opacity-50 mt-8'>
          No tasks yet. Add your first task above!
        </p>
      ) : (
        <div className='list flex gap-10 flex-wrap'>
          {tasks.map(task => (
            <TaskNote
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onComplete={handleComplete}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className='w-3/4 mx-auto mt-10 mb-8'>
          <button
            onClick={() => setShowCompleted(prev => !prev)}
            className='flex items-center gap-2 text-[#40513B] font-semibold text-lg cursor-pointer hover:opacity-75'
          >
            <span style={{ display: 'inline-block', transform: showCompleted ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▶</span>
            ✓ Completed ({completedTasks.length})
          </button>
          {showCompleted && (
            <div className='list flex gap-10 flex-wrap mt-4 opacity-75'>
              {completedTasks.map(task => (
                <div key={task.id} className='task-note px-4 py-8 line-through'>
                  <div className='font-semibold text-lg'>{task.title}</div>
                  <hr />
                  <div className='p-4'>{task.detail}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default App
