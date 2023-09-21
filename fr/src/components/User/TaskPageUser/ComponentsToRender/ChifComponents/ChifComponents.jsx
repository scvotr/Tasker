import { UserComponents } from "../UserComponents/UserComponents";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../context/AuthProvider";
import { ChifButtonGroup } from "./ChifButtonGroup/ChifButtonGroup";
import { HOST_ADDR } from "../../../../../utils/ApiHostAdres";
import { TasksFromSubDep } from "./TasksFromSubDep/TasksFromSubDep";
import { TasksToSubDep } from "./TasksToSubDep/TasksToSubDep"
import "./ChifComponents.css";

//! ----------------------------------------
export const getAllTasksBySubDep = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/getAllTasksBySubDep", {
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
    onSuccess(error);
  }
};

export const getAllResponsibleTasksBySubDep = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/getAllResponsibleTasksBySubDep", {
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
    onSuccess(error);
  }
};
//! ----------------------------------------

export const ChifComponents = () => {
  const currentUser = useAuthContext();
  const [resStaus, setReqStatus] = useState(null);
  const [taskFormKey, setTaskFormKey] = useState(0);

  const [taskFromSubDep, setTaskFromSubDep] = useState([]);
  const [taskToSubDep, setTaskToSubDep] = useState([]);

  const [selectedButton, setSelectedButton] = useState(
    localStorage.getItem("selectedChifMenuButton") || "allTasksFromSubDep"
  );

  // -----------------------------------
  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);
  const handleMenuButtonClick = (button) => {
    setSelectedButton(button);
  };
  const handleTaskOnModalSubmit = (isSuccess) => {
    // Вызов хендлера из UserComponents => handleTaskOnModalSubmit
    setIsTaskSubmitted(isSuccess);
    setTaskFormKey((prevKey) => prevKey + 1);
  };
  // -----------------------------------

  useEffect(() => {
    localStorage.setItem("selectedChifMenuButton", selectedButton);
  }, [selectedButton]);

  useEffect(() => {
    if (currentUser.login) {
      try {
        getAllTasksBySubDep(currentUser.token, setReqStatus).then((data) => {
          setTaskFromSubDep(data);
        });
        getAllResponsibleTasksBySubDep(currentUser.token, setReqStatus).then((data) => {
          const filterByApprovedTasks = data.filter((task) => task.task_status.toString() !== "new");
          setTaskToSubDep(filterByApprovedTasks);
        });
      } catch (error) {}
    }
  }, [currentUser, taskFormKey]);

  let taskTableComponent;
  if (selectedButton === "allTasksFromSubDep") {
    taskTableComponent = <TasksFromSubDep tasks={taskFromSubDep} onTaskSubmit={handleTaskOnModalSubmit} />;
  } else if (selectedButton === "allTasksToSubDep") {
    taskTableComponent = <TasksToSubDep tasks={taskToSubDep} onTaskSubmit={handleTaskOnModalSubmit} />;
  }

  return (
    <>
      <UserComponents updateUp={setTaskFormKey}/>

      <div className="mobile">
        <ChifButtonGroup
          handleButtonClick={handleMenuButtonClick}
          selectedButton={selectedButton}
          fromDepLength={taskFromSubDep.length}
          toDepLength={taskToSubDep.length}
        />
        {taskTableComponent}
      </div>
    </>
  );
};
