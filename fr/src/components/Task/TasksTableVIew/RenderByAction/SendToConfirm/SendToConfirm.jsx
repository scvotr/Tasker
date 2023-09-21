import './SendToConfirm.css'
import { useAuthContext } from '../../../../../context/AuthProvider'
import { useState } from "react";
// import { updateTaskConfirmRequest } from '../../../../../../api/Task/Tasks';
import { FullTaskInfo } from '../../../../Task/FullTaskInfo/FullTaskInfo'
import { HOST_ADDR } from '../../../../../utils/ApiHostAdres'


export const updateTaskConfirmRequest = async (token, data ,onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/updateTaskConfirmRequest", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error)
  }
};

export const SendToConfirm = ({task, reRenderUp}) => {
  const currentUser = useAuthContext()
  const [resStaus, setReqStatus] = useState(null);

  const handleClick = async() => {
    if(currentUser.login){
      try {
        const transferData = {
          task_id: task.task_id,
          confirmation_on: true,
          task_status: "needToConfirm",
        };
        await updateTaskConfirmRequest(currentUser.token, transferData, setReqStatus)
        reRenderUp();
      } catch (error) {
        console.log('SendToConfirm', error)
      }
    }
  }

  return (
    <div className=" approve-form">
      <FullTaskInfo task={task}/>
      <button className='confirm-btn' onClick={handleClick}>Выполннено</button>
    </div>
  )
}