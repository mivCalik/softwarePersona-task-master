import { useState, useEffect } from 'react'

interface Task {
  id: string
  title: string
  detail: string
}

interface Props {
  onSave: (title: string, detail: string) => void
  editingTask: Task | null
}

export default function CreateTask({ onSave, editingTask }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDetail(editingTask.detail)
      setExpanded(true)
    }
  }, [editingTask])

  function handleSave() {
    if (!title.trim() && !detail.trim()) return
    onSave(title, detail)
    setTitle('')
    setDetail('')
    setExpanded(false)
  }

  return (
    <div className='text-xl m-auto py-20'>
      <form className='create-task py-2' onSubmit={e => e.preventDefault()}>
        {expanded && (
          <input
            className='my-2 mx-4 py-2 px-8'
            placeholder='Task Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        )}
        <textarea
          onClick={() => setExpanded(true)}
          className='my-2 mx-4 px-8 py-2'
          placeholder='Task detail'
          rows={expanded ? 3 : 1}
          value={detail}
          onChange={e => setDetail(e.target.value)}
        />
        {expanded && (
          <div className='mx-4 mb-2 flex gap-2'>
            <button
              type='button'
              onClick={handleSave}
              className='px-4 py-1 bg-[#40513B] text-[#F0F0DB] rounded hover:opacity-90'
            >
              Save
            </button>
            <button
              type='button'
              onClick={() => { setTitle(''); setDetail(''); setExpanded(false) }}
              className='px-4 py-1 rounded border border-[#F2A65A] text-[#F2A65A] hover:bg-[#F2A65A] hover:text-white transition-colors'
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
