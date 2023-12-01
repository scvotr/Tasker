import { useState } from "react";
import { ImageBlock } from "../../../Task/TaskForm/ImageBlock/ImageBlock";

export const VenchelFormV2 = () => {
  const initValue = {
    files: [],
    filePreviews: [],
    filesToRemove: [],
    task_files: [],
  };

  const [formData, setFormData] = useState(initValue); 
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleFormSubmit = () => {};
  const handleRemoveItem = () => {};

  const getInputData = async (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    if (name === "add_new_files" || name === "append_new_files") {
      setIsLoading(true)
      const allowedTypes = ["image/jpeg", "image/png"];
      const data = Array.from(files).filter((file) =>
        allowedTypes.includes(file.type)
      );
      const previews = await Promise.all(
        data.map(file => {
          return new Promise( resolve => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              if(file.type.startsWith('image/')){
                const image = new Image();
                image.src = e.target.result
                image.onload = () => {
                  resolve(e.target.result)
                }
              } else if (fileReader.type.startsWith('application/pdf')) {
                resolve(e.target.result);  
              }
            };
            fileReader.readAsDataURL(file)
          })
        })
      )
      setIsLoading(false)
      setFormData( (prev) => ({
        ...prev,
        files : [...prev.files, ...data],
        filePreviews : [...prev.filePreviews, ...previews]
      }))
    } else if(name === '') {

    } else if(name === '2'){

    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFIleInput = (e) => {
    if (e.target.files.length > 5) {
      alert(`не больше 5`);
    }
  };

  return (
    <div className="form">
      {isLoading ? (
        <>Загрузка.....</>
      ) : (
        <form className="form__container" onSubmit={handleFormSubmit}>
          <div className="add-file">
            <label>
              pic
              <div>
                <input
                  className="form-input__file"
                  type="file"
                  onChange={getInputData}
                  name={isEdit ? "append_new_files" : "add_new_files"}
                  accept="image/jpeg, image/png"
                  multiple
                  onInput={handleFIleInput}
                />
              </div>
            </label>
          </div>

          <ImageBlock files={formData} actionType="addNewTaskFiles" />

          <div className="add-edit__btn">
            <button className="form__btn" type="submit">
              {isEdit ? "Редактирование" : "Создать"}
            </button>
          </div>
          {isEdit && (
            <button className="form__btn-remove" onClick={handleRemoveItem}>
              Удалить
            </button>
          )}
        </form>
      )}
    </div>
  );
};
