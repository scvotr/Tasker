import { HOST_ADDR } from "./ApiHostAdres";

export const getDataFromEndpoint = async (
  token,
  endpoint,
  method,
  data = null,
  onSuccess
) => {
  try {
    const res = await fetch(HOST_ADDR + endpoint, {
      method: method,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: data ? data : null,
    });
    if (res.ok) {
      const resData = await res.json();
      return resData;
    } else {
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error);
  }
}