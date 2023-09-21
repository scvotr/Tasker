import "./DepartmentSelect.css";
import { HOST_ADDR } from "../../../../utils/ApiHostAdres";
import { useAuthContext } from "../../../../context/AuthProvider";
import { useEffect, useState } from "react";

const getDepartments = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/orgStruct/getDepartments", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const resType = res.headers.get("Content-Type");
    if (res.ok && resType && resType.includes("application/json")) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error);
  }
};

export const DepartmentSelect = (props) => {
  const { value, onChange } = props;
  const currUser = useAuthContext();
  const [departments, setDepartments] = useState([]);
  const [reqStatus, setReqStatus] = useState("")
  useEffect(() => {
    if (currUser.login) {
      try {
        getDepartments(currUser.token, setReqStatus)
          .then((data) => setDepartments(data))
          .catch((error) => console.log(error));
      } catch (error) {}
    }
  }, [currUser]);

  return (
    <select
      value={value}
      onChange={onChange}
      name="department_id"
      required
    >
      <option value=''>
        Выберите Подразделение
      </option>
      {departments &&
        departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
    </select>
  );
};

// ДОБАВИТЬ className черз props или явно тут через css?!