import { MainMenuAdministration } from '../MainMenuAdministration/MainMenuAdministration';
import { useAuthContext } from "../../../context/AuthProvider";
import { useEffect, useState } from "react";
import { HOST_ADDR } from "../../../utils/ApiHostAdres";
import './TaskPageAdministration.css'
import { RenderTasksTable } from '../../Task/RenderTasksTable/RenderTasksTable';

export const getAllTasks = async (token, apiHostAddr, onSuccess) => {
  try {
    const res = await fetch(apiHostAddr + "/admin/getAllTasks", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const resType = res.headers.get("Content-Type");
    if (res.ok && resType && resType.includes("application/json")) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      onSuccess("Server response was not ok or content type is not JSON");
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error);
  }
};

export const TaskPageAdministration = () => {
  const currentUser = useAuthContext();
  const [reqStatus, setReqStatus] = useState(null);
  const [userUpdated, setUserUpdated] = useState(false)
  const [tasks, setTasks] = useState([]); console.log('tasks', tasks)

  useEffect(() => {
    if (currentUser.login) {
      try {
        getAllTasks(currentUser.token, HOST_ADDR, setReqStatus)
          .then((data) => setTasks(data))
          .catch((error) => setReqStatus(error));
      } catch (error) {}
    }
  }, [currentUser, userUpdated]);

  return (
    <div className="admin-task-page">
      <div className="admin-task-page__container">Редактирование задач</div>
      <div className="admin-task-page__container">
        <MainMenuAdministration />
      </div>
      <div className="admin-task__body">
        редактирование задач
      </div>
      <RenderTasksTable tasks={tasks} actionType='editTask'/>
    </div>
  );
}

// обновлять таблицу после удаления если нет фалов не запрашивать папку по ID