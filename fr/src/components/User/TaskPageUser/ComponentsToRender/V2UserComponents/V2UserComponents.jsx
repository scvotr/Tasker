import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../context/AuthProvider";
import { getDataFromEndpoint } from "../../../../../utils/getDataFromEndpoint";
import { V2UserButtonGroup } from "./V2UserButtonGroup/V2UserButtonGroup";
import { RenderTasksTable } from "../../../../Task/RenderTasksTable/RenderTasksTable";
import { Modal } from "../../../../Modal/Modal";
import { TaskForm } from "../../../../Task/TaskForm/TaskForm";

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
  const currentUser = useAuthContext();
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

  const [alltasks, setAllTasks] = useState()

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
    const getRandomInterval = () => Math.floor(Math.random() * 5000) + 1000; 
    const t = getRandomInterval(); console.log(t)
    const fetchDataInterval = setInterval(fetchData, getRandomInterval());
    return () => clearInterval(fetchDataInterval);
  }, [currentUser, prevUserAppointTasks, prevUserResponsibleTasks, taskFormKey]);


// !------------------------------------
  useEffect(() => {
    const initialData = localStorage.getItem('initialData');

    if(!initialData) {
      console.log('no data in local')
      localStorage.setItem('initialData', JSON.stringify(alltasks));
    } else if(!arraysAreEqual(alltasks, JSON.parse(initialData))) {
      console.log('Some thin not equal')
      const prevTasks = JSON.parse(initialData)

      
      // Проверяем, определен ли prevTasks перед использованием его свойств
      if (Array.isArray(prevTasks) && Array.isArray(alltasks)) {
        // Получаем записи, которых нет в prevTasks
        const newTasks = alltasks.filter((task) => !prevTasks.some(prevTask => prevTask.task_id === task.task_id));
        console.log('Новые задачи:', newTasks);
      } else {
        console.log('prevTasks или alltasks не являются массивами или не определены');
      }
    }
  },[currentUser, taskFormKey, alltasks])
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
      {msg ? (<>{msg}</>):(<></>)}
      {unreadNotification ? (
        <>
          <div>У вас новые данные!{msg}</div>
          <button onClick={markNotificationAsRead}>Отметить как прочитанное</button>
        </>
      ) : (<></>)}
      {/* --------------------------------------------------- */}
      <div>
        <button
          onClick={toggleForm}
          style={{ display: showCreateButton ? "block" : "none"}}
        >
          Новая задача
        </button>
        {showForm && (
          <Modal isOpen={modalOpen} onClose={closeModal}>
            <TaskForm
              keyProp={taskFormKey}
              onTaskSubmit={handleTaskOnModalSubmit}
            />
          </Modal>  
        )}
      </div>
      {/* --------------------------------------------------- */}
      <V2UserButtonGroup
        handleButtonClick={handleMenuButtonClick}
        selectedButton={selectedButton}

        appoinNewTasks={appoinNewTasks.length}
        approvedAppoinTasks={approvedAppoinTasks.length}
        appoinTasksInWork={appoinTasksInWork.length}
        needApproveToCloseAppoinTasks={needApproveToCloseAppoinTasks.length}
        closedAppointTasks={closedAppointTasks.length}

        responsibleTasksInWork={responsibleTasksInWork.length}
        approvedResponsibleTasks={approvedResponsibleTasks.length}
        needApproveToCloseResponsibleTasks={needApproveToCloseResponsibleTasks.length}
        closedResponsibleTasks={closedResponsibleTasks.length}
      />
      {taskTableComponent}
    </>
  );
};

V2UserButtonGroup.defaultProps = {
  updateToTop : () => {},
}