export const sendAuthData = async (authData, apiHostAddr, resError) => {
  try {
    const res = await fetch(apiHostAddr + '/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(authData),
    })
    const data = await res.json();
    const token = res.headers.get("Authorization")
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("dep", data.dep);
      localStorage.setItem("subDep", data.subDep);
      localStorage.setItem("position", data.position);
      window.location.href = "/";
    } else {
      resError(data.Authtorisation)
    }
  } catch (error) {
    resError(error)
  }
}
