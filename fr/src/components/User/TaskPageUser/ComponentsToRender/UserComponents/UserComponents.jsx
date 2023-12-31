import "./UserComponents.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../context/AuthProvider";
import { UserButtonGroup } from "./UserButtonGroup/UserButtonGroup";
import { HOST_ADDR } from "../../../../../utils/ApiHostAdres";
import { getAllUserTasks } from "./API/getAllUserTasks";
import { Modal } from "../../../../Modal/Modal";
import { TaskForm } from "../../../../Task/TaskForm/TaskForm";
import { RenderTasksTable } from "../../../../Task/RenderTasksTable/RenderTasksTable";

export const UserComponents = ({updateUp}) => {
  const currentUser = useAuthContext();
  const [resStaus, setReqStatus] = useState(null);
  //! -----------select button actions---------------start
  const [selectedButton, setSelectedButton] = useState(
    localStorage.getItem("selectedUserMenuButton") || "createdTasks"
  );
  useEffect(() => {
    localStorage.setItem("selectedUserMenuButton", selectedButton);
  }, [selectedButton]);
  const handleMenuButtonClick = (button) => {
    setSelectedButton(button);
  };
  // -----------select button actions---------------end
  //! -----------Modal window action---------------start
  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);
  const [taskFormKey, setTaskFormKey] = useState(0);

  const handleTaskOnModalSubmit = (isSuccess) => {
    setIsTaskSubmitted(isSuccess);
    setTaskFormKey((prevKey) => prevKey + 1);
    updateUp((prevKey) => prevKey + 1)
  };

  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const showCreateButton = !showForm && !selectedTask;

  const toggleForm = () => {
    if (selectedTask) {
      setSelectedTask(null);
    }
    setShowForm(!showForm);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalOpen(false);
    setShowForm(false);
  };
  // -----------Modal window action---------------end
  // -------------TASKS FILTER BY STATUS----------------
  const [userCreatedTasks, setUsersCreatedTask] = useState([]); // новые созданые задачи +
  const [approvedTasks, setApprovedTasks] = useState([]); // Согласованные задачи +
  const [tasksInWork, setTaskInWork] = useState([]); // Назаначен исполнитель задачи +
  const [needApproveToCloseTasks, setneedApproveToCloseTasks] = useState([]); // Требуют подтверждения на закрытие +
  const [closedTasks, setClosedTask] = useState([]); // Закрытые задачи +

  const filterTasksByStatus = (data, status) => data.filter((task) => task.task_status.toString() === status);

  useEffect(() => {
    if (currentUser.login) {
      try {
        getAllUserTasks(HOST_ADDR, currentUser.token, setReqStatus).then((data) => {
          if (data.length) {
            setUsersCreatedTask(filterTasksByStatus(data, "new")); // Новые созданые задачи +
            setApprovedTasks(filterTasksByStatus(data, "approved")); // Согласованные задачи начальник отдела ОТВЕТСВЕННЫЙ НЕ НА ЗНАЧЕН +
            setTaskInWork(filterTasksByStatus(data, "inWork")); // Назначен ответсвенный задача в работе+
            setneedApproveToCloseTasks(filterTasksByStatus(data, "needToConfirm")); // Проверить и подвердить выполнение +
            setClosedTask(filterTasksByStatus(data, "closed")); // Закрытые задачи +
          } else {
          }
        });
      } catch (error) {}
    }
  }, [currentUser, taskFormKey]);

  let taskTableComponent;
  if (selectedButton === "createdTasks") {
    taskTableComponent = (
      // ? Новые созданые задачи от текущего пользователя task_status = "new"  "СОЗДАНЫЕ ЗАДАЧИ" +
      <RenderTasksTable tasks={userCreatedTasks} actionType="editTask" onTaskSubmit={handleTaskOnModalSubmit} />
    );
   } else if (selectedButton === "approved") {
    taskTableComponent = (
      // ? Согласованые задачи начальником отдела task_status = "approved"  "СОГЛАСОВАННЫ"
      <RenderTasksTable tasks={approvedTasks} actionType="viewOnly" onTaskSubmit={handleTaskOnModalSubmit} />
    );
  } else if (selectedButton === "inWorkTask") {
    taskTableComponent = (
      // ? Назначен ответсвеный task_status = "inWork" "В РАБОТЕ"
      <RenderTasksTable tasks={tasksInWork} actionType="viewOnly" onTaskSubmit={handleTaskOnModalSubmit} />
    );
  } else if (selectedButton === "needChekTask") {
    taskTableComponent = (
      // ? Задача выполнена нужно подтвердить исполнение task_status = "needToConfirm"  "НА ПРОВЕРКЕ"
      <RenderTasksTable tasks={needApproveToCloseTasks} actionType="confirmTask" onTaskSubmit={handleTaskOnModalSubmit} />
    );
  } else if (selectedButton === "closedTask") {
    taskTableComponent = (
      // ? Задача закрыта task_status = "closed"  "ЗАКРЫТЕ ЗАДАЧИ"
      <RenderTasksTable tasks={closedTasks} actionType="viewOnly" onTaskSubmit={handleTaskOnModalSubmit} />
    );
  } 
  return (
    <div>
      <div className="test">
        <button onClick={toggleForm} style={{ display: showCreateButton ? "block" : "none" }}>
          Создать
        </button>
        {showForm && (
          <Modal isOpen={modalOpen} onClose={closeModal}>
            <TaskForm keyProp={taskFormKey} onTaskSubmit={handleTaskOnModalSubmit} />
          </Modal>
        )}
      </div>

      <UserButtonGroup
        handleButtonClick={handleMenuButtonClick}
        selectedButton={selectedButton}
        createdTasks={userCreatedTasks.length}
        approvedTasks={approvedTasks.length}
        tasksInWork={tasksInWork.length}
        onConfirmLenght={needApproveToCloseTasks.length}
        closed={closedTasks.length}
      />
      {taskTableComponent}
    </div>
  );
};

UserComponents.defaultProps = {
  updateUp: ()=> {}
}