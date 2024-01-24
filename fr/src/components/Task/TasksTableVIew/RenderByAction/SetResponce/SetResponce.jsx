import { useAuthContext } from "../../../../../context/AuthProvider";
import "./SetResponce.css";
import { PositionSelect } from "../../../../SelectFields/HoldinStuct/Position/PositionSelect";
import { useState } from "react";
// import { updateTaskResponceSubDep } from '../../../../../../api/Task/Tasks'
import { FullTaskInfo } from "../../../../Task/FullTaskInfo/FullTaskInfo";
import { HOST_ADDR } from "../../../../../utils/ApiHostAdres";

export const updateTaskResponceSubDep = async (token, data, onSuccess) => {
  console.log(data)
  try {
    const res = await fetch(HOST_ADDR + "/tasks/updateTaskResponceSubDep", {
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

export const SetResponce = ({ task, reRenderUp }) => {
  const currentUser = useAuthContext();

  const [regStatus, setReqStatus] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState({}); 

  const handlePositionChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "position_id") {
      setSelectedPosition((prevData) => ({
        ...prevData,
        position_id: value,
      }));
    } else if (name === "user_id") {
      setSelectedPosition((prevData) => ({
        ...prevData,
        user_id: value,
      }));
    }
  };

  const handleSetResponceSubDep = async (e, task) => {
    e.preventDefault();
    if (currentUser.login) {
      const transferData = {
        task_id: task.task_id,
        responce_user_id: selectedPosition.position_id,
        setResponseUser_on: true,
        task_status: "inWork",
        responsible_user_id: selectedPosition.user_id,
      };
      try {
        await updateTaskResponceSubDep(currentUser.token, transferData, setReqStatus);
        reRenderUp();
      } catch (error) {
        console.log("handleSetResponceSubDep", error);
      }
    }
  };

  return (
    <div className=" approve-form">
      <FullTaskInfo task={task} />
      <form className="task-field" onSubmit={(e) => handleSetResponceSubDep(e, task)}>
        <PositionSelect filterBy={currentUser.subDep} onChange={handlePositionChange} value={selectedPosition.position_id} />
        <button className="confirm-btn" type="submit">
          назначить
        </button>
      </form>
    </div>
  );
};
