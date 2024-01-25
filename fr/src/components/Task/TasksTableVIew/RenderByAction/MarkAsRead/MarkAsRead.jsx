import './MarkAsRead.css'
import { FullTaskInfo } from '../../../../Task/FullTaskInfo/FullTaskInfo'
import { useAuthContext } from '../../../../../context/AuthProvider'
import { useState } from 'react'

export const MarkAsRead = ({task, reRenderUp}) => {
  const currentUser = useAuthContext()
  
  const [localStorageTasks, setLocalStorageTasks] = useState(
    JSON.parse(localStorage.getItem('localStorageTasksData')) || []
  )

  console.log('localStorageTasks', localStorageTasks)

  const handleClick = () => {
    if (currentUser.login) {
      setLocalStorageTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, task];
        localStorage.setItem('localStorageTasksData', JSON.stringify(updatedTasks));
        return reRenderUp();
      });
    }
  };

  return (
    <div className=" approve-form">
      <FullTaskInfo task={task}/>
      <button className='confirm-btn' onClick={handleClick}>Прочитать</button>
  </div>
  )
}