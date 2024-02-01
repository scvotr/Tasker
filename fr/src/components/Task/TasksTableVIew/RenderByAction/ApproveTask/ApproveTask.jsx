import "./ApproveTask.css";
import { useAuthContext } from "../../../../../context/AuthProvider";
import { useState } from "react";
// import { updateTaskStatus } from "../../../../../../api/Task/Tasks";
import { FullTaskInfo } from "../../../../Task/FullTaskInfo/FullTaskInfo";
import { HOST_ADDR } from "../../../../../utils/ApiHostAdres";

export const updateTaskStatus = async (token, data ,onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/updateTaskStatus", {
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

export const ApproveTask = ({ task, reRenderUp }) => {
  const currentUser = useAuthContext();
  const [resStaus, setReqStatus] = useState(null);
  const [isApprove, setIsApprove] = useState(false);

  const handleApproveTask = async (isApprove) => {
    if (currentUser.login) {
      try {
        if (isApprove) {
          const transferData = {
            task_id: task.task_id,
            task_status: "approved",
            approved_on: true,
            // --------------------------
            appoint_user_id: task.appoint_user_id,
            appoint_department_id:task.appoint_department_id,
            responsible_department_id:task.responsible_department_id,
            appoint_subdepartment_id: task.appoint_subdepartment_id,
            responsible_subdepartment_id: task.responsible_subdepartment_id,
          };
          await updateTaskStatus(currentUser.token, transferData, setReqStatus);
          reRenderUp()
        } else {
          const transferData = {
            task_id: task.task_id,
            task_status: "reject",
            reject_on: true,
          };
          console.log("Не согласована", task.task_id, transferData);
          reRenderUp()
        }
      } catch (error) {}
    }
  };
  return (
    <div className=" approve-form">
      <FullTaskInfo task={task}/>
      <button className="approve-btn" onClick={() => handleApproveTask(true)}>согласовать</button>
      <button className="approve-btn-rej" onClick={() => handleApproveTask(false)}>отклонить</button>
    </div>
  );
};