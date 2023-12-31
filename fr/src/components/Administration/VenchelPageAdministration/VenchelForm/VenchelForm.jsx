import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./VenchelForm.css";
import { ImageBlock } from "../../../Task/TaskForm/ImageBlock/ImageBlock";
import { VenchelTextFields } from "./VenchelTextFields/VenchelTextFields";
import { useAuthContext } from "../../../../context/AuthProvider";
import { sendDataToEndpoint } from "../../../../utils/sendDataToEndpoint";

// import { DepartmentSelect } from "../../../SelectFields/HoldinStuct/Dep/DepartmentSelect";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

import { HOST_ADDR } from "../../../../utils/ApiHostAdres";

export const getPreviewFileContent = async (token, data, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/venchel/getPreviewFileContent", {
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

export const VenchelForm = ({ dep, sector, reRender, selectedVenchel, closeModal, closeForm,}) => {
  const currentUser = useAuthContext();
  const initValue = {
    venchel_id: uuidv4(),
    position: "",
    type: "",
    pos_num: "",
    model: "",
    location: "",
    power: "",
    length: "",
    width: "",
    height: "",
    department_id: dep,
    workshop_id: sector,
    sector: sector,
    files: [],
    filePreviews: [],
    files_to_remove: [],
    task_files: [],
  };

  const [formData, setFormData] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [reqStatus, setReqStatus] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState(formData.venchel_id);

  useEffect(() => {
    if (selectedVenchel) {
      //! не запрашивать если файлов нет
      getPreviewFileContent(currentUser.token, selectedVenchel, setReqStatus)
        .then((data) => {
          setIsEdit(true);
          const updatedTaskToEdit = { ...selectedVenchel, old_files: data };
          setFormData({ ...initValue, ...updatedTaskToEdit });
        })
        .catch((error) => {
          // Обработка ошибки, если необходимо
        });
    }
  }, [selectedVenchel]);

  const handleRemoveCurrentFiles = (fileIndex) => {
    const currentFiles = [...formData.old_files];
    const currentFilesName = [...formData.file_names];
    currentFiles.splice(fileIndex, 1);
    const filesNamesToRemove = currentFilesName.splice(fileIndex, 1);
    const filesToRemove = [...formData.files_to_remove, filesNamesToRemove];

    setFormData((prev) => ({
      ...prev,
      old_files: currentFiles,
      file_names: currentFilesName,
      files_to_remove: filesToRemove,
    }));
  };

  const handleRemoveAppendedFile = (fileIndex) => {
    if (formData.files && formData.filePreviews) {
      try {
        const currentFiles = [...formData.files];
        const currentPrewievs = [...formData.filePreviews];
        currentFiles.splice(fileIndex, 1);
        currentPrewievs.splice(fileIndex, 1);
        setFormData((prev) => ({
          ...prev,
          files: currentFiles,
          filePreviews: currentPrewievs,
        }));
      } catch (error) {
        console.error("Ошибка при удалении файла", error);
      }
    }
  };

  const handleRemoveVenchel = async (e) => {
    e.preventDefault();
    const data = {
      venchel_id: formData.venchel_id,
      files_names: formData.file_names,
    };
    try {
      await sendDataToEndpoint(
        currentUser.token,
        data,
        "/venchel/removeVenchel",
        "POST",
        setReqStatus
      );
      reRender(true);
    } catch (error) {
      reRender(false);
    }
  };

  const handleGetInputData = async (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    if (name === "add_new_files" || name === "append_new_files") {
      try {
        setIsLoading(true);
        const allowedTypes = ["image/jpeg", "image/png"];
        const data = Array.from(files).filter((file) =>
          allowedTypes.includes(file.type)
        );
        const previews = await Promise.all(
          data.map((file) => {
            return new Promise((resolve) => {
              const fileReader = new FileReader();
              fileReader.onload = (e) => {
                if (file.type.startsWith("image/")) {
                  const image = new Image();
                  image.src = e.target.result;
                  image.onload = () => {
                    resolve(e.target.result);
                  };
                } else if (fileReader.type.startsWith("application/pdf")) {
                  resolve(e.target.result);
                }
              };
              fileReader.readAsDataURL(file);
            });
          })
        );
        setFormData((prev) => ({
          ...prev,
          filePreviews: [...prev.filePreviews, ...previews],
          files: [...prev.files, ...data],
        }));
      } catch (error) {
        console.error("An error occurred while processing files:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (name === "") {
    } else if (name === "2") {
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isEdit) {
      try {
        await sendDataToEndpoint(
          currentUser.token,
          formData,
          "/venchel/updateVenchel",
          "POST",
          setReqStatus
        );
        setFormData({ 
          ...formData,
          filePreviews: [], //[...prev.filePreviews, ...previews]
          files_to_remove: [],
        })
        // ! не обновляються файлы при редактирвоании
        reRender(true)
        setIsLoading(false);
        closeForm()
      } catch (error) {
        reRender(false)
        setIsLoading(false);
      }
    } else {
      try {
        await sendDataToEndpoint(
          currentUser.token,
          formData,
          "/venchel/addNewVenchel",
          "POST",
          setReqStatus
        );
        setFormData(initValue);
        setIsLoading(false);
        reRender(true);
      } catch (error) {
        setIsLoading(false);
        reRender(false);
      }
    }
  }
  
  const handleFIleInput = (e) => {
    const input = e.target;
    if (input.files.length > 5) {
      alert("Максимальное количество файлов - 5");
      input.value = "";
    }
  };

  return (
    <>
      {isLoading ? (
        <>Загрузка.....</>
      ) : (
        <form className="form__container-venchel" onSubmit={handleFormSubmit}>
          <VenchelTextFields
            getData={handleGetInputData}
            value={formData}
            isEdit={isEdit}
            handleFileInput={handleFIleInput}
          />
          {/* <DepartmentSelect value = {formData.department_id} onChange = {handleGetInputData}/> */}

          {/* ----------------------------------------- */}
          <div className="task-form-image__prewiev">
            {isEdit && formData.old_files.length > 0 && (
              <ImageBlock
                files={formData.old_files}
                actionType="tableViewOnly"
                takeExistIndex={handleRemoveCurrentFiles}
              />
            )}
            <ImageBlock
              files={formData}
              actionType="addNewTaskFiles"
              takeAddedIndex={handleRemoveAppendedFile}
            />
          </div>
          {/* ----------------------------------------- */}

          <div className="container-btn">
            <button className="form__btn" type="submit">
              {selectedVenchel ? "Редактирование" : "Создать"}
            </button>
            {selectedVenchel && (
              <>
                <button className="form__btn" onClick={() => closeForm()}>
                  закрыть
                </button>
                <button
                  className="form__btn-remove"
                  onClick={handleRemoveVenchel}
                >
                  Удалить
                </button>
              </>
            )}
          </div>
        </form>
      )}
    </>
  );
};
