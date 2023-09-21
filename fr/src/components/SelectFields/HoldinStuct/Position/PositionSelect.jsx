import "./PositionSelect.css";

import { HOST_ADDR } from "../../../../utils/ApiHostAdres";
import { useAuthContext } from "../../../../context/AuthProvider";
import { useEffect, useState } from "react";

const getPositions = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/orgStruct/getPositions", {
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

export const PositionSelect = (props) => {
  const {value, onChange, filterBy} = props

  const curentUser = useAuthContext();
  const [reqStatus, setRegStatus] = useState(""); // console.log('reqStatus', reqStatus)
  const [filteredPositions, setFilteredPositions] = useState([])

  useEffect(() => {
    if (curentUser.login) {
      try {
        getPositions(curentUser.token, setRegStatus)
          .then((data) => {
            if(filterBy){
              setFilteredPositions(
                data.filter((position) => position.subdepartment_id.toString().includes(filterBy))
              )
            } else {
              setFilteredPositions('')
            }
          })
          .catch((er) => console.log(er));
      } catch (error) {}
    }
  }, [curentUser, filterBy]);

  return (
    <select value={value} onChange={onChange} name="position_id" required>
      <option value='' disabled>
        Выберите Должность:
      </option>
      {filteredPositions &&
        filteredPositions.map((postion) => (
          <option key={postion.id} value={postion.id}>
            {postion.name}
          </option>
        ))}
    </select>
  );
};

PositionSelect.defaultProps = {
  value: '',
  onChange: () => {},
  filterBy: ''
};