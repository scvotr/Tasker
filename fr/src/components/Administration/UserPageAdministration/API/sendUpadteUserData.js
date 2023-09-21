
export const sendUpadteUserData = async (token, user, apiHostAddr, onSuccess) => {
  try {
    const res = await fetch(apiHostAddr + "/admin/updateUserData", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body : JSON.stringify(user)
    });

    const resType = res.headers.get("Content-Type");
    if (res.ok && resType && resType.includes("application/json")) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      onSuccess("Server response was not ok or content type is not JSON")
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error);
  }
};