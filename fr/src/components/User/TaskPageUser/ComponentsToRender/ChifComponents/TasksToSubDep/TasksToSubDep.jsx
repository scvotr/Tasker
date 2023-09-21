import { useEffect, useState } from "react";
import { RenderTasksTable } from "../../../../../Task/RenderTasksTable/RenderTasksTable";
import { ButtonMenuGroup } from "./ButtonMenuGroup/ButtonMenuGroup";
import "./TasksToSubDep.css";

export const TasksToSubDep = ({ tasks, onTaskSubmit }) => {
  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);
  const [taskFormKey, setTaskFormKey] = useState(0);

  const handleTaskOnModalSubmit = (isSuccess) => {
    setIsTaskSubmitted(isSuccess);
    setTaskFormKey((prevKey) => prevKey + 1);
    onTaskSubmit();
  };

  const [selectedButton, setSelectedButton] = useState(
    localStorage.getItem("selectedChifMenuButtonToSubDep") || "inWork"
  );

  const handleMenuButtonClick = (button) => {
    setSelectedButton(button);
  };

  const filterTasksByStatus = (data, status) => data.filter((task) => task.task_status.toString() === status);

  const [needResponser, setNeedResponser] = useState([]);
  const [tasksInWork, setTasksInWork] = useState([]);
  const [needConfirm, setNeedConfirm] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);

  useEffect(() => {
    setNeedResponser(filterTasksByStatus(tasks, "approved"));
    setTasksInWork(filterTasksByStatus(tasks, "inWork"));
    setNeedConfirm(filterTasksByStatus(tasks, "needToConfirm"));
    setClosedTasks(filterTasksByStatus(tasks, "closed"));

    localStorage.setItem("selectedChifMenuButtonToSubDep", selectedButton);
  }, [tasks, taskFormKey, selectedButton]);

  let taskTableComponent;
  if (selectedButton === "needResponser") {
    taskTableComponent = (
      <RenderTasksTable tasks={needResponser} actionType="setResponce" onTaskSubmit={handleTaskOnModalSubmit} />
    );
  } else if (selectedButton === "inWork") {
    taskTableComponent = (
      <RenderTasksTable tasks={tasksInWork} actionType="sendToClose" onTaskSubmit={handleTaskOnModalSubmit} />
    );
  } else if (selectedButton === "onConfirm") {
    taskTableComponent = (
      <RenderTasksTable tasks={needConfirm} actionType="viewOnly" onTaskSubmit={handleTaskOnModalSubmit} />
    );
  } else if (selectedButton === "closed") {
    taskTableComponent = (
      <RenderTasksTable tasks={closedTasks} actionType="viewOnly" onTaskSubmit={handleTaskOnModalSubmit} />
    );
  }

  return (
    <>
      <ButtonMenuGroup
        handleButtonClick={handleMenuButtonClick}
        selectedButton={selectedButton}
        notResponcer={needResponser.length}
        workingNow={tasksInWork.length}
        onConfirm={needConfirm.length}
        wasClosed={closedTasks.length}
      />

      {taskTableComponent}
    </>
  );
};
