/*
    await sendDataToEndpoint(
      currentUser.token,
      formData,
      "/venchel/addNewVenchel",
      "POST",
      setReqStatus
    );
    
*/


import {
  HOST_ADDR
} from "./ApiHostAdres";
import {
  convertToFormData
} from "./convertToFormData";

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
      // const responseData = await res.json();
      onSuccess(responseData);
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};