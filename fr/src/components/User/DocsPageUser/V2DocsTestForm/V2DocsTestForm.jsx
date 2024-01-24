import { useState } from "react";
import { useAuthContext } from "../../../../context/AuthProvider";
import { sendDataToEndpoint } from "../../../../utils/sendDataToEndpoint";
import "./V2DocsTestForm.css";

export const V2DocsTestForm = () => {
  const currentUser = useAuthContext();
  const [reqStatus, setReqStatus] = useState()
  const [blobData, setBlobData] = useState(null);


  const [formData, setFormData] = useState({
    name: currentUser.name,
    text: "",
  }); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser.login) {
      sendDataToEndpoint(
        currentUser.token,
        formData,
        "/docs/testToPDF",
        "POST",
        'blob',
        (response) => {
          setBlobData(response); // Сохранение объекта Blob в состоянии
          setReqStatus('success'); // Обновление статуса запроса
        },
      );
    }
  };

  const handleGetFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDownload = () => {
    // Очистка объекта Blob
    setBlobData(null);
    // Сброс статуса запроса
    setReqStatus(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-send form-send--modifier">
        <input
          type="text"
          name="text"
          value={formData.test}
          onChange={handleGetFormData}
        />
        <button type="submit">создать PDF + подпись</button>
      </form>
      <div>
        {formData.name} <p>{formData.text}</p>
      </div>
      <div>
      {blobData && ( // Отображаем данные только если blobData существует
        <div className="download-link download-link--modifier">
          {/* Если BLOB обьект */}
          {/* <a href={URL.createObjectURL(blobData)} download="document.docx">Скачать файл</a> */}
          
          {/* Если ссылка из BLOB обьекта */}
          <a href={blobData} download="output_with_watermark.pdf" className="download-link__link">Скачать</a>
          <button onClick={handleDownload} className="download-link__button">Закрыть</button>
        </div>
      )}
    </div>
    </div>
  );
};
