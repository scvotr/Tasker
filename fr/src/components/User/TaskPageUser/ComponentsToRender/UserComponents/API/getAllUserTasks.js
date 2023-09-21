export const getAllUserTasks = async (apiHostAddr, token, onSuccess) => {
  try {
    const res = await fetch(apiHostAddr + "/tasks/getAllUserTasks", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error)
  }
};