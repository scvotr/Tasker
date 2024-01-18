import { useEffect, useState } from "react";
import "./DocsTestForm.css";
import { useAuthContext } from "../../../../context/AuthProvider";
import { sendDataToEndpoint } from "../../../../utils/sendDataToEndpoint.js";
import { formatDate } from "../../../../utils/formatDate.js";

export const DocsTestForm = () => {
  const currentUser = useAuthContext();

  const initVal = {
    name: currentUser.name,
    currentData: formatDate(new Date()).split('.').reverse().join('-'),
    selectData: formatDate(new Date()).split('.').reverse().join('-'), // Приведение даты к ожидаемому формату "yyyy-MM-dd"
    timeStart: "08:00",
    timeEnd: "09:00",
  };

  const [formData, setFormData] = useState(initVal);
  console.log(formData);
  const [reqStatus, setReqStatus] = useState(null);
  console.log('reqStatus', reqStatus)
  const [blobData, setBlobData] = useState(null);
  console.log('blobData', blobData)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateFormData = {
      ...formData,
      currentData: formatDate(formData.currentData),
      selectData: formatDate(formData.selectData),
    }

    sendDataToEndpoint(
      currentUser.token,
      // formData,
      updateFormData,
      "/docs/test",
      "POST",
      "blob",
      (response) => {
        console.log('Тип данных response:', typeof response); // Вывод типа данных response
        console.log('Содержимое response:', response); // Вывод содержимого response
        setBlobData(response); // Сохранение объекта Blob в состоянии
        setReqStatus('success'); // Обновление статуса запроса
      },
    );
    setFormData(initVal);
  };

  const handleGetData = (e) => {
    const { name, value } = e.target;
    if (name === "selectData") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatDate(value).split('.').reverse().join('-'),
      }));
    } else if(name === "currentData"){
      setFormData((prev) => ({
        ...prev,
        [name]: formatDate(value).split('.').reverse().join('-'),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name:currentUser.name,
      currentData: formatDate(new Date()).split('.').reverse().join('-'),
      selectData: formatDate(new Date()).split('.').reverse().join('-'),
    }));
  }, [currentUser]);

  return (
    <>
      <>
        <form onSubmit={handleSubmit}>
          <label>
            Прошу предоставить мне
            <input type="date" name="selectData" value={formData.selectData} onChange={handleGetData} />
          </label>
          <label> c 
            <input type='time' min="08:00" max="18:00" step="1800" name='timeStart' value={formData.timeStart} onChange={handleGetData} required/>
          </label>
          <label> до 
            <input type='time' min="08:00" max="18:00" step="1800" name='timeEnd' value={formData.timeEnd} onChange={handleGetData} required/>
          </label>
          <label> в счет отпуска.</label>
          <br />
          <br />
          <br />
          <label>
            Дата
            <input type="date" name="currentData" value={formData.currentData} onChange={handleGetData}/>
          </label>          
          <p>{formData.name}</p>
          <br />
          <br />

          <button type="submit">Отправить</button>
        </form>
      </>
      <div>
        {blobData && ( // Отображаем данные только если blobData существует
          // Если BLOB обьект
          // <a href={URL.createObjectURL(blobData)} download="document.docx">Скачать файл</a>
          // Если ссылка из BLOB обьекта
          <a href={blobData} download="document.docx">Скачать</a>
        )}
      </div>
    </>
  );
};