import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../context/AuthProvider";
import { getDataFromEndpoint } from "../../../../../utils/getDataFromEndpoint";

const filterTasksByStatus = (data, status) => {
  return data.filter((task) => task.task_status && task.task_status.toString() === status);
};

const filterTasksByResponceSide = (data, user_id) => {
  return data.filter((task) => task.responsible_user_id && task.responsible_user_id.toString() === user_id);
};

const filterTasksByAppointSide = (data, user_id) => {
  return data.filter((task) => task.appoint_user_id && task.appoint_user_id.toString() === user_id);
};

// Функция для сравнения двух массивов
const arraysAreEqual = (array1, array2) => {
  return JSON.stringify(array1) === JSON.stringify(array2);
};

export const V2UserComponents = ({ updateToTop }) => {
  const currentUser = useAuthContext();
  const [resStatus, setReqStatus] = useState(null);
  const [msg, setMsg] = useState('')
  const [unreadNotification, setUnreadNotification] = useState(false); // Новое состояние для отслеживания статуса уведомления

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

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser.login) {
        try {
          const newData = await getDataFromEndpoint(currentUser.token, '/tasks/getAllUserTasks', 'POST', null, setReqStatus);
          console.log('newData', newData)  
          console.log('prevUserAppointTasks', prevUserAppointTasks)  
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
    const fetchDataInterval = setInterval(fetchData, 15000);
    return () => clearInterval(fetchDataInterval);
  }, [currentUser, prevUserAppointTasks, prevUserResponsibleTasks]);

  const markNotificationAsRead = () => {
    setUnreadNotification(false);
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
    </>
  );
};