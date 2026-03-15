interface Task {
  id: string
  title: string
  detail: string
}

interface Props {
  task: Task
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
  onComplete: (task: Task) => void
}

export default function TaskNote({ task, onDelete, onEdit, onComplete }: Props) {
  function handleDelete() {
    if (window.confirm('Are you sure you want to permanently delete this note?')) {
      onDelete(task.id)
    }
  }

  function handleFinish() {
    window.alert('Congratulations! 🎉 Task completed!')
    onComplete(task)
  }

  return (
    <div className='task-note px-4 py-8'>
      <div className='font-semibold text-lg'>{task.title}</div>
      <hr />
      <div className='p-4'>{task.detail}</div>
      <div className='buttons'>
        <input type='button' value='Delete' onClick={handleDelete} className='cursor-pointer px-2 py-1 rounded border text-sm transition-colors border-[#E05C2A] text-[#E05C2A] hover:bg-[#E05C2A] hover:text-white' />
        <input type='button' value='Edit' onClick={() => onEdit(task)} className='cursor-pointer px-2 py-1 rounded border text-sm transition-colors border-[#F2A65A] text-[#F2A65A] hover:bg-[#F2A65A] hover:text-white' />
        <input type='button' value='Finish' onClick={handleFinish} className='cursor-pointer px-2 py-1 rounded border text-sm transition-colors border-[#40513B] text-[#40513B] hover:bg-[#40513B] hover:text-white' />
      </div>
    </div>
  )
}
