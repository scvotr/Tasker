import './V2UserComponents.css'
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import { useAuthContext } from "../../../../../context/AuthProvider";
import { getDataFromEndpoint } from "../../../../../utils/getDataFromEndpoint";
import { V2UserButtonGroup } from "./V2UserButtonGroup/V2UserButtonGroup";
import { RenderTasksTable } from "../../../../Task/RenderTasksTable/RenderTasksTable";
import { Modal } from "../../../../Modal/Modal";
import { TaskForm } from "../../../../Task/TaskForm/TaskForm";
import { HOST_SOCKET } from "../../../../../utils/ApiHostAdres";

const filterTasksByStatus = (data, status) => {
  return data.filter((task) => task.task_status && task.task_status.toString() === status);
};

const filterTasksByResponceSide = (data, user_id) => {
  return data.filter((task) => task.responsible_user_id && task.responsible_user_id.toString() === user_id);
};

const filterTasksByAppointSide = (data, user_id) => {
  return data.filter((task) => task.appoint_user_id && task.appoint_user_id.toString() === user_id);
};

const arraysAreEqual = (array1, array2) => {
  return JSON.stringify(array1) === JSON.stringify(array2);
};

const defaultSelect =  localStorage.getItem("selectedUserMenuButton") || "createdTasks"

export const V2UserComponents = ({ updateToTop }) => {
  const currentUser = useAuthContext()
  const [resStatus, setReqStatus] = useState(null);

  const [msg, setMsg] = useState('')
  const [unreadNotification, setUnreadNotification] = useState(false); // Новое состояние для отслеживания статуса уведомления
  const markNotificationAsRead = () => { setUnreadNotification(false) }

  const [prevUserAppointTasks, setPrevUserAppointTasks] = useState([]);
  const [prevUserResponsibleTasks, setPrevUserResponsibleTasks] = useState([]);

  const [userAppointTasks, setuserAppointTasks] = useState([]);
  const [closedAppointTasks, setClosedAppointTasks] = useState([]);  // console.log('closedAppointTasks', closedAppointTasks)
  const [needApproveToCloseAppoinTasks, setNeedApproveToCloseAppoinTasks] = useState([]);// console.log('needApproveToCloseAppoinTasks', needApproveToCloseAppoinTasks)
  const [approvedAppoinTasks, setApprovedAppoinTasks] = useState([]); //console.log('approvedAppoinTasks', approvedAppoinTasks)
  const [appoinTasksInWork, setAppoinTaskInWork] = useState([]); //console.log('appoinTasksInWork', appoinTasksInWork)
  const [appoinNewTasks, setAppoinNewTasks] = useState([]);// console.log('appoinNewTasks', appoinNewTasks)

  const [userResponsibleTasks, setUserResponsibleTasks] = useState([]);
  const [closedResponsibleTasks, setClosedResponsibleTasks] = useState([]); //  console.log('closedResponsibleTasks', closedResponsibleTasks)
  const [needApproveToCloseResponsibleTasks, setNeedApproveToCloseResponsibleTasks] = useState([]); //console.log('needApproveToCloseResponsibleTasks', needApproveToCloseResponsibleTasks)
  const [approvedResponsibleTasks, setApprovedResponsibleTasks] = useState([]); //console.log('approvedResponsibleTasks', approvedResponsibleTasks)
  const [responsibleTasksInWork, setResponsibleTaskInWork] = useState([]);// console.log('responsibleTasksInWork', responsibleTasksInWork)


  const [selectedButton, setSelectedButton] = useState(defaultSelect);

  const handleMenuButtonClick = (button) => { setSelectedButton(button) };

  useEffect(()=> {
    localStorage.setItem("selectedUserMenuButton", selectedButton);
  }, [selectedButton])

  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);
  const [taskFormKey, setTaskFormKey] = useState(0);

  const handleTaskOnModalSubmit = async(isSuccess) => {
    setIsTaskSubmitted(isSuccess);
    setTaskFormKey((prevKey) => prevKey + 1);
    if(updateToTop) {
      await updateToTop((prevKey) => prevKey + 1)
    }
  };

  const handleTaskTakeSubmit = async(isSuccess) => {
    setIsTaskSubmitted(isSuccess);
    setTaskFormKey((prevKey) => prevKey + 1);
    if(updateToTop) {
      await updateToTop((prevKey) => prevKey + 1)
    }
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

  const [allTasks, setAllTasks] = useState()
  // console.log(allTasks)
  const [alltasksSocket, setAllTasksSocket] = useState()
  // console.log('!!!!!!!!!!!!', alltasksSocket)

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser.login) {
        try {
          const newData = await getDataFromEndpoint(currentUser.token, '/tasks/getAllUserTasks', 'POST', null, setReqStatus);
          setAllTasks(newData)//!---------------------------
          // Сравнение предыдущих данных с новыми данными
          if (!arraysAreEqual(newData, prevUserAppointTasks)) {
            setMsg(`New data received at ${new Date().toLocaleString()}`)
            setUnreadNotification(true); // Устанавливаем статус непрочитанного уведомления
            setPrevUserAppointTasks(newData);
            setuserAppointTasks((prevUserAppointTasks) => {
              const filteredAppointTasks = filterTasksByAppointSide(newData, currentUser.id);
              setClosedAppointTasks(filterTasksByStatus(filteredAppointTasks, "closed"));
              setNeedApproveToCloseAppoinTasks(filterTasksByStatus(filteredAppointTasks, "needToConfirm"));
              setApprovedAppoinTasks(filterTasksByStatus(filteredAppointTasks, "approved"));
              setAppoinTaskInWork(filterTasksByStatus(filteredAppointTasks, "inWork"));
              setAppoinNewTasks(filterTasksByStatus(filteredAppointTasks, "new"));
              return filteredAppointTasks;
            });
          }
          if (!arraysAreEqual(newData, prevUserResponsibleTasks)) {
            setMsg(`New data received at ${new Date().toLocaleString()}`)
            setUnreadNotification(true); // Устанавливаем статус непрочитанного уведомления
            setPrevUserResponsibleTasks(newData);
            setUserResponsibleTasks((prevUserResponsibleTasks) => {
              const filteredResponsibleTasks = filterTasksByResponceSide(newData, currentUser.id);
              setClosedResponsibleTasks(filterTasksByStatus(filteredResponsibleTasks, "closed"));
              setNeedApproveToCloseResponsibleTasks(filterTasksByStatus(filteredResponsibleTasks, "needToConfirm"));
              setApprovedResponsibleTasks(filterTasksByStatus(filteredResponsibleTasks, "approved"));
              setResponsibleTaskInWork(filterTasksByStatus(filteredResponsibleTasks, "inWork"));
              return filteredResponsibleTasks;
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    // Вызываем fetchData при первоначальной загрузке
    fetchData();
    // Если вы хотите обновлять данные с определенной периодичностью, раскомментируйте следующие строки
    // const getRandomInterval = () => Math.floor(Math.random() * 10000) + 1000; 
    // const t = getRandomInterval(); console.log(t)
    // const fetchDataInterval = setInterval(fetchData, getRandomInterval());
    // return () => clearInterval(fetchDataInterval);
  }, [currentUser, prevUserAppointTasks, prevUserResponsibleTasks, taskFormKey]);
  // !------------------------------------

  const [socketMsg, setSocketMsg] = useState({})
  console.log('socketMsg', socketMsg.message)

  useEffect(()=> {
    const leadSubDep = 'leadSubDep_' + currentUser.subDep;
    const userSocket = 'leadSubDep_' + currentUser.id;

    const socket = io(HOST_SOCKET, {
      extraHeaders: { Authorization: currentUser.token },
    });
    socket.on('connect', () => {
      socket.emit('getMyRooms');
    });
    socket.on('yourRooms', (rooms) => {
      console.log('Я подключен к комнатам:', rooms);
    });
    socket.on(leadSubDep, (data) => {
      console.log(`подключен к комнате ${leadSubDep}`, data.taskData)
      
    });

    socket.on('taskCreated', (taskData) => {
      console.log('Получена информация о создании задачи:', taskData);
      setSocketMsg(taskData)
    });

    socket.on('taskApproved', (taskData) => {
      console.log('Новая задача:', taskData);
      // Здесь вы можете добавить логику обработки задачи
    });

    socket.on('taskApproved2', (taskData) => {
      console.log('Задача согласованна:', taskData);
      // Здесь вы можете добавить логику обработки задачи
    });
    
    socket.on(userSocket, (taskData) => {
      console.log('Получена информация о создании задачи:', taskData);
      // Здесь вы можете добавить логику обработки задачи
    });

    window.addEventListener('beforeunload', () => {
      socket.disconnect();
    });
 
    return () => {
      socket.off('connect');
      socket.off(leadSubDep);
      socket.off('taskCreated');
      socket.off('taskApproved');
      socket.disconnect();
      window.removeEventListener('beforeunload', () => socket.disconnect());
    };
  }, [currentUser])


  const [newTasks, setNewTasks] = useState([])
  
  // !------------------------------------
  useEffect(() => {
    const localStorageTasksData = localStorage.getItem('localStorageTasksData');

    if(!localStorageTasksData || localStorageTasksData === 'undefined') {
      localStorage.setItem('localStorageTasksData', JSON.stringify(allTasks));
    } else if(!arraysAreEqual(allTasks, JSON.parse(localStorageTasksData))) {
      const tasksNotInLocalStorage  = JSON.parse(localStorageTasksData)
      // Проверяем, определен ли tasksNotInLocalStorage  перед использованием его свойств
      if (Array.isArray(tasksNotInLocalStorage ) && Array.isArray(allTasks)) {
        const notInLocalStorage = allTasks.filter((task) => !tasksNotInLocalStorage.some(prevTask => prevTask.task_id === task.task_id));
        setNewTasks(notInLocalStorage)
        // console.log('Новые задачи:', notInLocalStorage );
      } else {
        console.log('tasksNotInLocalStorage или allTasks не являются массивами или не определены');
      }
    }
  },[currentUser, taskFormKey, allTasks])
// !------------------------------------

  const tableDataMapping = {
    createdTasks: {
      tasks: appoinNewTasks,
      actionType : "editTask"
    },
    approved : {
      tasks : approvedAppoinTasks,
      actionType : "viewOnly"
    },
    inWorkTask : {
      tasks : appoinTasksInWork,
      actionType : "viewOnly"
    },
    needChekTask : {
      tasks : needApproveToCloseAppoinTasks,
      actionType : "confirmTask"
    },
    closedTask : {
      tasks : closedAppointTasks,
      actionType : "viewOnly"
    },
    res_inWorkTask : {
      tasks : responsibleTasksInWork,
      actionType : "sendToClose"
    },
    res_approved : {
      tasks : approvedResponsibleTasks,
      actionType : "viewOnly"
    },
    res_needChekTask : {
      tasks : needApproveToCloseResponsibleTasks,
      actionType : "viewOnly"
    },
    res_closedTask : {
      tasks : closedResponsibleTasks,
      actionType : "viewOnly"
    },
  }

  let taskTableComponent;
  if(selectedButton in tableDataMapping) {
    const {tasks, actionType} = tableDataMapping[selectedButton]
    taskTableComponent = (
      <RenderTasksTable
        tasks={tasks}
        actionType={actionType}
        onTaskSubmit={handleTaskOnModalSubmit}
      />
    )
  }

  return (
    <>
      <h2 className="user-task-page__notifications-heading">
        Уведомления новые\изменился статус:
      </h2>
      {socketMsg.message && socketMsg.message.length ? (
        <>
          <h3 className="user-task-page__no-new-tasks">
            {socketMsg.message}
          </h3>
        </>
      ) : (
        <h3 className="user-task-page__no-new-tasks">Новых задач нет</h3>
      )}
      {/* {newTasks && newTasks.length ? (
        <>
          <RenderTasksTable
            tasks={newTasks}
            actionType={'markAsRead'}
            onTaskSubmit={handleTaskTakeSubmit}
          />
        </>
      ) : (
        <h3 className="user-task-page__no-new-tasks">Новых задач нет</h3>
      )} */}
  
      {/* --------------------------------------------------- */}
      <div className="user-task-page__button-container">
        <button
          className="user-menu__button"
          onClick={toggleForm}
          style={{ display: showCreateButton ? "block" : "none" }}
        >
          Новая задача
        </button>
        {showForm && (
          <Modal isOpen={modalOpen} onClose={closeModal}>
            <TaskForm keyProp={taskFormKey} onTaskSubmit={handleTaskOnModalSubmit} />
          </Modal>
        )}
      </div>
      {/* --------------------------------------------------- */}
      {/* Three blocks in a row */}
      <div className="user-task-page__three-blocks-container">
        <V2UserButtonGroup
          handleButtonClick={handleMenuButtonClick}
          selectedButton={selectedButton}
          responsibleTasksInWork={responsibleTasksInWork.length}
          approvedResponsibleTasks={approvedResponsibleTasks.length}
          needApproveToCloseResponsibleTasks={needApproveToCloseResponsibleTasks.length}
          closedResponsibleTasks={closedResponsibleTasks.length}
        />

        <div className="user-task-page__task-table-container">
          {taskTableComponent}
        </div>

        <V2UserButtonGroup
          handleButtonClick={handleMenuButtonClick}
          selectedButton={selectedButton}
          appoinNewTasks={appoinNewTasks.length}
          approvedAppoinTasks={approvedAppoinTasks.length}
          appoinTasksInWork={appoinTasksInWork.length}
          needApproveToCloseAppoinTasks={needApproveToCloseAppoinTasks.length}
          closedAppointTasks={closedAppointTasks.length}
        />
      </div>
    </>
  );
};

V2UserButtonGroup.defaultProps = {
  updateToTop : () => {},
}


// function getTasksNotInLocalStorage(allTasks, localStorageTasksData) {
//   if (!localStorageTasksData || localStorageTasksData === 'undefined') {
//     console.log('No data in local storage');
//     localStorage.setItem('localStorageTasksData', JSON.stringify(allTasks));
//     return [];
//   } else if (!arraysAreEqual(allTasks, JSON.parse(localStorageTasksData))) {
//     console.log('Some data is not equal');
//     return allTasks.filter(task => !JSON.parse(localStorageTasksData).some(prevTask => prevTask.task_id === task.task_id));
//   } else {
//     return [];
//   }
// }

// // !------------------------------------
// useEffect(() => {
//   const localStorageTasksData = localStorage.getItem('localStorageTasksData');
//   const tasksNotInLocalStorage = getTasksNotInLocalStorage(allTasks, localStorageTasksData);

//   if (tasksNotInLocalStorage.length > 0) {
//     console.log('Задачи, которых нет в локальном хранилище:', tasksNotInLocalStorage);
//   }
// }, [currentUser, taskFormKey, allTasks]);