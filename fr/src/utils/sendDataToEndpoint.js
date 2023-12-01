/*
    await sendDataToEndpoint(
      currentUser.token,
      formData,
      "/venchel/addNewVenchel",
      "POST",
      setReqStatus
    );
    
*/


import { HOST_ADDR } from "./ApiHostAdres";
import { convertToFormData } from "./convertToFormData";

export const sendDataToEndpoint = async (
  token,
  formData,
  endpoint,
  method,
  onSuccess
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
      const responseData = await res.json();
      onSuccess(responseData);
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};