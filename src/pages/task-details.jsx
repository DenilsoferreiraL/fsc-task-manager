import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import * as I from '../assets/icons/index'
import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar'

export const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      setTask(data)
      console.log(data)
    }
    fetchTask()
  }, [taskId])
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-1">
            <span></span>
          </div>
        </div>
      </div>
      <Link to={`/`} className="transition hover:opacity-75">
        <Button color="rounded">
          <I.ArrowLeftIcon />
          <p>{task?.message}</p>
        </Button>
      </Link>
    </div>
  )
}
