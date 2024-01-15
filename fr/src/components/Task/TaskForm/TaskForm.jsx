import { useAuthContext } from "../../../context/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { convertToFormData } from "../../../utils/convertToFormData";
import { TextDataField } from "./TextDataField/TextDataField";
import { SelectUser } from "./SelectUser/SelectUser";
import { ImageBlock } from "./ImageBlock/ImageBlock";
import "./TaskForm.css";

// !------------------------------------------------------------------
import { HOST_ADDR } from "../../../utils/ApiHostAdres";

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
      return responseData
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};

export const removeTask = async (token, data, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/tasks/removeTask", {
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
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};

export const updateTask = async (token, formData, onSuccess) => {
  delete formData.filePreviews;
  const data = convertToFormData(formData);
  try {
    const res = await fetch(HOST_ADDR + "/tasks/updateTask", {
      method: "POST",
      headers: {
        Authorization: token,
        // "Content-Type": "application/json",
      },
      body: data,
      // body: JSON.stringify(data),
    });
    if (res.ok) {
      const responseData = await res.json();
      onSuccess(responseData);
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};
export const sendNewTaskData = async (token, formData, onSuccess) => {
  delete formData.filePreviews;
  const data = convertToFormData(formData);
  try {
    const res = await fetch(HOST_ADDR + "/tasks/addNewTask", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });
    if (res.ok) {
      const responseData = await res.json();
      onSuccess(responseData);
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};

export const getUserByPosition = async (token, pos_id, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/user/getUserIdByPosition", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: pos_id,
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
// !------------------------------------------------------------------

export const TaskForm = ({ taskToEdit, onTaskSubmit, keyProp }) => {
  console.log('!!!!!!!!!!!!!', onTaskSubmit)
  const currentUser = useAuthContext();
  const initValue = {
    task_id: uuidv4(),
    task_status: "new",
    task_descript: "",
    task_comment: [],
    deadline: "",
    task_priority: false,
    appoint_user_id: currentUser.id, // кто назначил = текущий пользователь
    appoint_department_id: currentUser.dep,
    appoint_subdepartment_id: currentUser.subDep,
    appoint_position_id: currentUser.position,
    responsible_user_id: "",
    responsible_department_id: "",
    responsible_subdepartment_id: "",
    responsible_position_id: "",
    files: [],
    filePreviews: [],
    filesToRemove: [],
    task_files: [],
  };

  const [formData, setFormData] = useState(initValue);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reqStatus, setReqStatus] = useState();

  useEffect(() => {
    if (taskToEdit) {
      getPreviewFileContent(currentUser.token, taskToEdit, setReqStatus)
        .then(data => {
          setIsEdit(true);
          const updatedTaskToEdit = { ...taskToEdit, old_files: data };
          setFormData({ ...initValue, ...updatedTaskToEdit });
        })
        .catch(error => {
          // Обработка ошибки, если необходимо
        });
    }
  }, [taskToEdit]);

  const removeTaskExistingFiles = (index) => {
    const updatedFiles = [...formData.old_files]; //! поле для фалов с сервера
    const nameRem = [...formData.file_names];
    updatedFiles.splice(index, 1);
    const removedNam = nameRem.splice(index, 1);
    const updatedFilesToRemove = [...formData.filesToRemove, removedNam];

    setFormData((prev) => ({
      ...prev,
      old_files: updatedFiles, //!поле для фалов с сервера
      file_names: nameRem,
      filesToRemove: updatedFilesToRemove,
    }));
  };

  const removeTaskAddedFiles = (index) => {
    const updatedFiles = [...formData.files];
    const updatedPreviews = [...formData.filePreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      files: updatedFiles,
      filePreviews: updatedPreviews,
    }));
  };

  const handelRemoveTask = async (e) => {
    e.preventDefault();
    const data = {
      task_id: formData.task_id,
      file_name: formData.file_names,
    };
    try {
      await removeTask(currentUser.token, data, setReqStatus);
      onTaskSubmit(true);
    } catch (error) {}
    onTaskSubmit(false);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    const { name, value, files, checked } = e.target;
    if (name === "add_new_files" || name === "append_new_files") {
      setIsLoading(true); // Set loading state to true
      const allowedTypes = ["image/jpeg", "image/png"]; //, "application/pdf"
      const data = Array.from(files).filter((file) => allowedTypes.includes(file.type));
      const previews = await Promise.all(
        data.map((file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (file.type.startsWith("image/")) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                  resolve(e.target.result);
                };
              } else if (file.type.startsWith("application/pdf")) {
                resolve(e.target.result);
              }
            };
            reader.readAsDataURL(file);
          });
        })
      );
      setIsLoading(false);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...data],
        filePreviews: [...prev.filePreviews, ...previews],
      }));
    } else if (name === "task_priority") {
      const data = checked;
      setFormData((prev) => ({ ...prev, task_priority: data }));
    } else if (name === "department_id") {
      setFormData((prev) => ({ ...prev, responsible_department_id: value }));
    } else if (name === "subdepartment_id") {
      setFormData((prev) => ({ ...prev, responsible_subdepartment_id: value }));
    } else if (name === "position_id") {
      console.log("positionsId", value);
      setFormData((prev) => ({ ...prev, responsible_position_id: value }));
      // 25_06_23
      // получить пользователя по должности!  ДОПИСАТЬ ОБРАБОТЧИК НА СЕРВЕРЕ
      const userByPosition = await getUserByPosition(currentUser.token, value, setReqStatus);
      setFormData((prev) => ({ ...prev, responsible_user_id: userByPosition }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    if (isEdit) {
      try {
        await updateTask(currentUser.token, formData, setReqStatus);
        onTaskSubmit(true);
        setIsLoading(false); // Set loading state to false
      } catch (error) {
        onTaskSubmit(false); // Сообщить об ошибке
        setIsLoading(false); // Set loading state to false
      }
    } else {
      try {
        await sendNewTaskData(currentUser.token, formData, setReqStatus);
        onTaskSubmit(true); // true - если успешно, false - если произошла ошибка
        setFormData(initValue);
        setIsLoading(false); // Set loading state to false
      } catch (error) {
        onTaskSubmit(false); // Сообщить об ошибке
        setIsLoading(false); // Set loading state to false
      }
    }
  };

  const handleFileInput = (event) => {
    // переписать на на максимальное количество файлов к задаче
    const input = event.target;
    if (input.files.length > 5) {
      alert("Максимальное количество файлов - 5");
      input.value = ""; // Очистить выбранные файлы
    }
  };

  return (
    <div className="form">
      {isLoading ? (
        <>Загрузка......</>
      ) : (
        <form className="form__container" onSubmit={handleSubmit}>
          <TextDataField getData={getInputData} value={formData} />
          <SelectUser getData={getInputData} value={formData} />
          {/* переверстать */}
          <div className="add-file">
            <label>
              Графическое изображение: <br></br>
              <div className="input-file">
                <input
                  className="form-input__file"
                  type="file"
                  name={isEdit ? "append_new_files" : "add_new_files"}
                  onChange={getInputData}
                  accept="image/jpeg, image/png"
                  multiple
                  onInput={handleFileInput}
                />
              </div>
            </label>
          </div>
          <div className="task-form-image__prewiev">
            {isEdit && (
              <ImageBlock
                files={formData.old_files}
                actionType="tableViewOnly"
                takeExistIndex={removeTaskExistingFiles}
              />
            )}
            <ImageBlock files={formData} actionType="addNewTaskFiles" takeAddedIndex={removeTaskAddedFiles} />
          </div>

          <div className="add__edit-btn">
            <button className="form__btn" type="submit">
              {isEdit ? "Редактирование" : "Создать"}
            </button>
          </div>

          {isEdit && (
            <button className="form__btn-remove" onClick={handelRemoveTask}>
              Удалить
            </button>
          )}
        </form>
      )}
    </div>
  );
};
