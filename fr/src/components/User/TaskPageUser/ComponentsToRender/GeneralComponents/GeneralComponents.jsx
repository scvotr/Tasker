import "./GeneralComponents.css";
import { useAuthContext } from "../../../../../context/AuthProvider";
import { useEffect, useState } from "react";
import { HOST_ADDR } from "../../../../../utils/ApiHostAdres";
import { RenderTasksTable } from "../../../../Task/RenderTasksTable/RenderTasksTable";
import { GeneralButtonGroup } from './GeneralButtonGroup/GeneralButtonGroup'


export const getAllTasksByDep = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/getAllAppointTasksFromDep", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
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

export const getAllResponsibleTasksByDep = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/getAllResponsibleTasksByDep", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
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

export const GeneralComponents = () => {
  const currentUser = useAuthContext();
  const [resStaus, setReqStatus] = useState(null);

  const [taskFromDep, setTaskFromDep] = useState([]);
  const [taskToDep, setTaskToDep] = useState([]);

  const [selectedButton, setSelectedButton] = useState(
    localStorage.getItem("selectedGeneralMenuButton") || "allTasksFromDep"
  );

  const handleMenuButtonClick = (button) => {
    setSelectedButton(button);
  };

  useEffect(() => {
    localStorage.setItem("selectedGeneralMenuButton", selectedButton);
  }, [selectedButton]);  

  useEffect(() => {
    if (currentUser.login) {
      try {
        getAllTasksByDep(currentUser.token, setReqStatus).then((data) => {
          setTaskFromDep(data);
        });
        getAllResponsibleTasksByDep(currentUser.token, setReqStatus).then((data) => {
          const filterByApprovedTasks = data.filter((task) => task.task_status.toString() !== "new");
          setTaskToDep(filterByApprovedTasks);
        });
      } catch (error) {}
    }
  }, [currentUser]);

  let taskTableComponent;
  if(selectedButton === 'allTasksFromDep'){
    taskTableComponent = <RenderTasksTable tasks={taskFromDep} actionType='viewOnly'/>
  } else if ( selectedButton === 'allTasksToDep'){
    taskTableComponent = <RenderTasksTable tasks={taskToDep} actionType='viewOnly'/>
  }

  return (
    <>
      <GeneralButtonGroup
        handleButtonClick={handleMenuButtonClick}
        selectedButton={selectedButton}
        taskFromDep = {taskFromDep.length}
        taskToDep = {taskToDep.length}
      />
      {taskTableComponent}
    </>
  )
};
