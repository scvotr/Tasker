import "./ConfirmTask.css";
import { useState } from "react";
import { useAuthContext } from "../../../../../context/AuthProvider";
// import { updateTaskCloseRequest } from "../../../../../../api/Task/Tasks";
import { FullTaskInfo } from "../../../../Task/FullTaskInfo/FullTaskInfo";
import { HOST_ADDR } from "../../../../../utils/ApiHostAdres";

export const updateTaskCloseRequest = async (token, data, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/updateTaskCloseRequest", {
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
    onSuccess(error);
  }
};
export const updateTaskRejectRequest = async (token, data, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/updateTaskRejectRequest", {
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
    onSuccess(error);
  }
};

export const ConfirmTask = ({ task, reRenderUp }) => {
  const currentUser = useAuthContext();
  const [resStaus, setReqStatus] = useState(null);

  const [isAccept, setIsAccept] = useState(false);
  console.log(isAccept);

  const handleConfirmTask = async (isAccept) => {
    if (currentUser.login) {
      try {
        if (isAccept) {
          const transferData = {
            task_id: task.task_id,
            closed_on: true,
            task_status: "closed",
            // -----
            responsible_user_id: task.responsible_user_id,
            appoint_user_id: task.appoint_user_id,
            appoint_department_id: task.appoint_department_id,
            responsible_department_id: task.responsible_department_id,
            appoint_subdepartment_id: task.appoint_subdepartment_id,
            responsible_subdepartment_id: task.responsible_subdepartment_id,
          };
          await updateTaskCloseRequest(
            currentUser.token,
            transferData,
            setReqStatus
          );
          reRenderUp();
        } else {
          const transferData = {
            task_id: task.task_id,
            reject_on: true,
            task_status: "inWork",
          };
          await updateTaskRejectRequest(
            currentUser.token,
            transferData,
            setReqStatus
          );
          reRenderUp();
        }
      } catch (error) {}
    }
  };

  return (
    <div className="approve-form">
      <FullTaskInfo task={task} />
      <button className="approve-btn" onClick={() => handleConfirmTask(true)}>
        Подтвердить
      </button>
      <button
        className="approve-btn-rej"
        onClick={() => handleConfirmTask(false)}
      >
        отклонить
      </button>
    </div>
  );
};
