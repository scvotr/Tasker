import "./TasksFromSubDep.css";
import { useState, useEffect } from "react";
import { ButtonMenuGroup } from "./ButtonMenuGroup/ButtonMenuGroup";
import { RenderTasksTable } from "../../../../../Task/RenderTasksTable/RenderTasksTable";

export const TasksFromSubDep = ({ tasks, onTaskSubmit }) => {
  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);
  const [taskFormKey, setTaskFormKey] = useState(0);

  const handleTaskOnModalSubmit = (isSuccess) => {
    setIsTaskSubmitted(isSuccess);
    setTaskFormKey((prevKey) => prevKey + 1);
    onTaskSubmit();
  };

  const [selectedButton, setSelectedButton] = useState(
    localStorage.getItem("selectedChifMenuButtonFromSubDep") || "inWork"
  );

  const handleMenuButtonClick = (button) => {
    setSelectedButton(button);
  };

  const filterTasksByStatus = (data, status) => data.filter((task) => task.task_status.toString() === status);

  const [allTaskToApprove, setAllTaskToApprove] = useState([]);
  const [allApprovedTasks, setAllApprovedTasks] = useState([]);
  const [allTaskInWork, setAllTaskInWork] = useState([]);
  const [allTaskToConfirm, setAllTaskToConfirm] = useState([]);
  const [allTaskClosed, setallTaskClosed] = useState([]);

  useEffect(() => {
    setAllTaskToApprove(filterTasksByStatus(tasks, "new"));
    setAllApprovedTasks(filterTasksByStatus(tasks, "approved"));
    setAllTaskInWork(filterTasksByStatus(tasks, "inWork"));
    setAllTaskToConfirm(filterTasksByStatus(tasks, "needToConfirm"));
    setallTaskClosed(filterTasksByStatus(tasks, "closed"));

    localStorage.setItem("selectedChifMenuButtonFromSubDep", selectedButton);
  }, [selectedButton, tasks, taskFormKey]);

  let taskTableComponent;
  if (selectedButton === "inWork") {
    taskTableComponent = <RenderTasksTable tasks={allTaskInWork} />;
  } else if (selectedButton === "toApprove") {
    taskTableComponent = (<RenderTasksTable tasks={allTaskToApprove} actionType="approve" onTaskSubmit={handleTaskOnModalSubmit} />);
  } else if (selectedButton === "approved") {
    taskTableComponent = <RenderTasksTable tasks={allApprovedTasks} />;
  } else if (selectedButton === "needConfirm") {
    taskTableComponent = <RenderTasksTable tasks={allTaskToConfirm} />;
  } else if (selectedButton === "completed") {
    taskTableComponent = <RenderTasksTable tasks={allTaskClosed} />;
  }

  return (
    <>
      <ButtonMenuGroup
        handleButtonClick={handleMenuButtonClick}
        selectedButton={selectedButton}
        tasksInWork={allTaskInWork.length}
        tasksToApprove={allTaskToApprove.length}
        approvedTasks={allApprovedTasks.length}
        tasksWasClosed={allTaskClosed.length}
        tasksNeedConfirm={allTaskToConfirm.length}
      />
      {taskTableComponent}
    </>
  );
};
