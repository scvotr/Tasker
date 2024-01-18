/*
    await sendDataToEndpoint(
      currentUser.token,
      formData,
      "/venchel/addNewVenchel",
      "POST",
      setReqStatus
    );
    
*/


import {  HOST_ADDR} from "./ApiHostAdres";
import {  convertToFormData} from "./convertToFormData";

export const sendDataToEndpoint = async (
  token,
  formData,
  endpoint,
  method,
  responseType = "json", // Значение по умолчанию для responseType
  onSuccess,
) => {
  if (formData.hasOwnProperty("filePreviews")) {
    delete formData.filePreviews;
  }
  const data = convertToFormData(formData);
  try {
    const res = await fetch(HOST_ADDR + endpoint, {
      method: method,
      headers: {
        Authorization: token,
      },
      body: data,
    });
    if (res.ok) {
      let responseData;
      if (responseType === "json") {
        responseData = await res.json();
      } else if (responseType === 'blob') {
        const fileBlob = await res.blob()
        const fileUrl = URL.createObjectURL(fileBlob)
        responseData = fileUrl
      }
      onSuccess(responseData);
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};

// Передача объекта Blob:
// Преимущество: Этот подход позволяет полностью контролировать обработку данных в вашем компоненте. Вы можете дополнительно манипулировать объектом Blob, если это необходимо.
// Недостаток: Вам придется использовать URL.createObjectURL непосредственно в вашем компоненте для создания ссылки на скачивание файла.

// Передача URL объекта Blob:
// Преимущество: Этот подход может уменьшить сложность кода в вашем компоненте, поскольку вы передаете уже готовую ссылку для скачивания файла.
// Недостаток: Ваша функция sendDataToEndpoint будет ответственна за создание URL объекта Blob, что может усложнить ее логику и сделать ее менее модульной.


// import React from 'react';

// const DownloadLink = ({ blobUrl, fileName }) => {
//   return (
//     <a href={blobUrl} download={fileName}>
//       Скачать файл
//     </a>
//   );
// };

// export default DownloadLink;

// <DownloadLink blobUrl={URL.createObjectURL(blobData)} fileName="document.docx" />