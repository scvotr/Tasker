import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./VenchelForm.css";
import { ImageBlock } from "../../../Task/TaskForm/ImageBlock/ImageBlock";
import { VenchelTextFields } from "./VenchelTextFields/VenchelTextFields";
import { useAuthContext } from "../../../../context/AuthProvider";
import { sendDataToEndpoint } from "../../../../utils/sendDataToEndpoint";
// import { DepartmentSelect } from "../../../SelectFields/HoldinStuct/Dep/DepartmentSelect";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

export const VenchelForm = ({ dep, sector, reRender, selectedVenchel }) => {
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
    sector: sector,
    files: [],
    filePreviews: [],
    filesToRemove: [],
    task_files: [],
  };

  const [formData, setFormData] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [reqStatus, setReqStatus] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState(formData.venchel_id);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isEdit) {
      try {
      } catch (error) {}
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
  };
  const handleRemoveVenchel = async (e) => {
    e.preventDefault();
    const data = {
      task_id: formData.id,
    };
    try {
      await sendDataToEndpoint(
        currentUser.token,
        data,
        "/venchel/removeVenchel",
        "POST",
        setReqStatus,
      );
      reRender(true);
    } catch (error) {
      isLoading(false);
      reRender(false);
    }
  };

  const getInputData = async (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    if (name === "add_new_files" || name === "append_new_files") {
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
      setIsLoading(false);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...data],
        filePreviews: [...prev.filePreviews, ...previews],
      }));
    } else if (name === "") {
    } else if (name === "2") {
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFIleInput = (e) => {
    const input = e.target;
    if (input.files.length > 5) {
      alert("Максимальное количество файлов - 5");
      input.value = "";
    }
  };

  const removeAppendedFile = (fileIndex) => {
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

  const removeCurrentFiles = (fileIndex) => {};

  useEffect(() => {
    if (selectedVenchel) {
      setFormData({ ...formData, ...selectedVenchel });
    }
  }, [selectedVenchel]);

  return (
    <>
      {isLoading ? (
        <>Загрузка.....</>
      ) : (
        <form className="form__container" onSubmit={handleFormSubmit}>
          <VenchelTextFields
            getData={getInputData}
            value={formData}
            isEdit={isEdit}
            handleFIleInput={handleFIleInput}
          />
          {/* <DepartmentSelect value = {formData.department_id} onChange = {getInputData}/> */}
          <ImageBlock
            files={formData}
            actionType="addNewTaskFiles"
            takeAddedIndex={removeAppendedFile}
          />
          <div className="add-edit__btn">
            <button className="form__btn" type="submit">
              {selectedVenchel ? "Редактирование" : "Создать"}
            </button>
            {selectedVenchel && (
              <button
                className="form__btn-remove"
                onClick={handleRemoveVenchel}
              >
                Удалить
              </button>
            )}
            <p>{reqStatus}</p>
          </div>
        </form>
      )}
    </>
  );
};
