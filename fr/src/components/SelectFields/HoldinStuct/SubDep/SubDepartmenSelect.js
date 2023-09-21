import "./SubDepartmenSelect.css";

import { HOST_ADDR } from "../../../../utils/ApiHostAdres";
import { useAuthContext } from "../../../../context/AuthProvider";
import { useEffect, useState } from "react";

const getSubDepartments = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/orgStruct/getSubDepartments", {
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

export const SubDepartmenSelect = (props) => {
  const { value, onChange, filterBy } = props;
  // console.log('SubDepartmenSelect - filterBy: ', filterBy)

  const curentUser = useAuthContext();
  const [reqStatus, setRegStatus] = useState("");// console.log('reqStatus', reqStatus)
  const [filteredSubDepartmens, setFilteredSubDepartmens] = useState([]);  //console.log('filteredSubDepartmens', filteredSubDepartmens)

  useEffect(() => {
    if (curentUser.login) {
      try {
        getSubDepartments(curentUser.token, setRegStatus)
        .then((data) => {
          // Фильтрация подразделений на основе filterBy
          if (filterBy) {
            setFilteredSubDepartmens(
              data.filter((subDepartment) => subDepartment.department_id.toString().includes(filterBy))
            );
          } else {
            setFilteredSubDepartmens(data);
          }
        })
        .catch((er) => console.log(er));
      } catch (error) {}
    }
  }, [curentUser, filterBy]);

  return (
    <select value={value} onChange={onChange}  name="subdepartment_id" required>
      {/* name="responsible_subdepartment_id" */}
      {/* <option value="" disabled defaultValue> */}
      <option value="">
        Выберите Отдел:
      </option>
      {filteredSubDepartmens &&
        filteredSubDepartmens.map((subDepartmen) => (
          <option key={subDepartmen.id} value={subDepartmen.id}>
            {subDepartmen.name}
          </option>
        ))}
    </select>
  );
};

SubDepartmenSelect.defaultProps = {
  value: '',
  onChange: () => {},
  filterBy: ''
};
