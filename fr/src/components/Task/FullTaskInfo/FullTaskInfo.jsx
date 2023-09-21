import "./FullTaskInfo.css";
import { Modal } from "../../Modal/Modal";
import { useEffect, useState } from "react";
import { HOST_ADDR } from "../../../utils/ApiHostAdres";
import { useAuthContext } from "../../../context/AuthProvider";
import { formatDate } from "../../../utils/formatDate";

// есть еще в TaskForm
export const getPreviewFileContent = async (token, data, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/getPreviewFileContent", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const responseData = await res.json();
      onSuccess(responseData);
      return responseData;
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};

const getFullFile = async (file, task_id, token) => {
  const { type, name } = file;
  const data = {
    type,
    name,
    task_id,
  };
  try {
    const res = await fetch(HOST_ADDR + "/tasks/getFullFileContent", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const resData = await res.json();
      return resData;
    } else {
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    console.log(error);
  }
};

export const FullTaskInfo = ({ task }) => {
  const currentUser = useAuthContext();

  const [taskData, setTaskData] = useState(task);

  const { token } = currentUser;

  const {
    appoint_department_name,
    appoint_subdepartment_name,
    appoint_user_name,

    responsible_department_name,
    responsible_subdepartment_name,
    responsible_position_name,

    deadline,
    created_on, //создана
    approved_on, // Согласованна
    setResponseSubDep_on, //назаначена
    confirmation_on, // отправлена на проверку
    closed_on, // закрыта
    reject_on, //отклоненеа

    file_names,
    task_descript,
    task_id,
    task_status,
    old_files,
  } = taskData;

  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = async (image) => {
    try {
      const test = await getFullFile(image, task_id, token);
      setSelectedImage(test);
    } catch (error) {
      console.log(error);
    }
    setShowImage(true);
  };
  const openModal = (task) => {
    setShowImage(true);
  };
  const closeModal = () => {
    setShowImage(false);
  };

  const [reqStatus, setReqStatus] = useState();

  useEffect(() => {
    if (task.old_files) {
      getPreviewFileContent(currentUser.token, task, setReqStatus)
        .then((data) => {
          const updatedTaskToEdit = { ...task, old_files: data };
          setTaskData({ ...task, ...updatedTaskToEdit });
        })
        .catch((error) => {
          // Обработка ошибки, если необходимо
        });
    } else {
      setTaskData(task)
    }
  }, [task]);

  return (
    <div className="task">
      <h2 className="task__title">Task ID: {task_id.slice(0, 4)}</h2>

      <div className="task__info">
        <p className="task__field">Статус: {task_status}</p>
        <p className="task__field">Создана: {formatDate(created_on)}</p>
        <p className="task__field">Выполнить до: {formatDate(deadline)}</p>
        {approved_on && <p className="task__field">Согласованна: {formatDate(approved_on)}</p>}
        {setResponseSubDep_on && <p className="task__field">В работе с: {formatDate(setResponseSubDep_on)}</p>}
        {confirmation_on && <p className="task__field">Отправлена на проверку: {formatDate(confirmation_on)}</p>}
        {reject_on && <p className="task__field">Отклонена: {formatDate(reject_on)}</p>}
        {closed_on && <p className="task__field">Закрыта: {formatDate(closed_on)}</p>}
      </div>

      <div className="task__details">
        <div className="task__column">
          <span className="task__subtitle">От Департамента:</span>
          <p className="task__field">{appoint_department_name}</p>
          <span className="task__subtitle">От Отдела:</span>
          <p className="task__field">{appoint_subdepartment_name}</p>
          <span className="task__subtitle">От Сотрудника:</span>
          <p className="task__field">{appoint_user_name}</p>
        </div>
        <div className="task__column">
          <span className="task__subtitle">Для Департамента:</span>
          <p className="task__field">{responsible_department_name}</p>
          <span className="task__subtitle">Для Отдела:</span>
          <p className="task__field">{responsible_subdepartment_name}</p>
          {responsible_position_name && <span className="task__subtitle">Для Службы:</span>}
          <p className="task__field">{responsible_position_name}</p>
        </div>
      </div>

      <div className="task__description">
        <span className="task__subtitle">Задача:</span>
        <p className="task__field">{task_descript}</p>
      </div>

      <div className="task__files">
        <span className="task__subtitle">Файлы:</span>
        <div>
          {old_files &&
            old_files.map((file, index) => {
              if (file.type === ".jpg" || file.type === ".png") {
                return (
                  <>
                    <img
                      className="task__images"
                      key={index}
                      height="100px"
                      src={`data:${file.type};base64,${file.content}`}
                      loading="lazy"
                      alt=""
                      onClick={() => handleImageClick(file)}
                    />
                  </>
                );
              } else if (file.type === ".pdf") {
                return (
                  <div key={index}>
                    <a href={`data:${file.type};base64,${file.content}`} download={file.name}>
                      {file.name}
                    </a>
                  </div>
                );
              }
            })}
        </div>
      </div>
      {showImage && selectedImage && (
        <Modal isOpen={openModal} onClose={closeModal}>
          <img
            height="575px"
            // height="100%"
            src={`data:${selectedImage.type};base64,${selectedImage.content}`}
            loading="lazy"
            alt=""
          />
        </Modal>
      )}
    </div>
  );
};
