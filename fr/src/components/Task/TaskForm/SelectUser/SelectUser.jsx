import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../context/AuthProvider";
import { DepartmentSelect } from "../../../SelectFields/HoldinStuct/Dep/DepartmentSelect";
import { SubDepartmenSelect } from "../../../SelectFields/HoldinStuct/SubDep/SubDepartmenSelect";
import { PositionSelect } from "../../../SelectFields/HoldinStuct/Position/PositionSelect";
import "./SelectUser.css";

const init = {
  responsible_department_id: "",
  responsible_subdepartment_id: "",
  responsible_position_id: "",
};

export const SelectUser = (props) => {
  const { getData, value } = props; //console.log('value', value)
  const currentUser = useAuthContext();

  const [userIsMaster, setUserIsMaster] = useState([currentUser]);
  const [selectData, setSelectData] = useState(init); //console.log('selectData', selectData)

  useEffect(() => {
    if (props.value) {
      setSelectData((prev) => ({ ...prev, ...value }));
    }
  }, [value]);

  useState(() => {
    setUserIsMaster(
      // если департамент текущего  юзера = 2
      userIsMaster.filter((data) => data.dep.toString().includes("2"))
    );
  }, [currentUser, selectData]);

  const handleGetDataFormSelect = (e) => {
    const { name, value } = e.target;
    if (name === "responsible_department_id" && value === "") {
      setSelectData((prev) => ({
        ...prev,
        [name]: value,
        responsible_subdepartment_id: "",
        responsible_position_id: "",
      }));
    } else if (name === "responsible_subdepartment_id" && value === "") {
      setSelectData((prev) => ({
        ...prev,
        [name]: value,
        responsible_position_id: "",
      }));
    } else {
      setSelectData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    getData(e);
  };

  return (
    <>
      {userIsMaster.length ? (
        <>
          <div className="select-section">
            <DepartmentSelect value={selectData.responsible_department_id} onChange={handleGetDataFormSelect} />
          </div>
          {selectData.responsible_department_id !== "" && (
            <div className="select-section">
              <SubDepartmenSelect
                onChange={handleGetDataFormSelect}
                filterBy={selectData.responsible_department_id}
                value={selectData.responsible_subdepartment_id}
              />
            </div>
          )}
          {selectData.responsible_subdepartment_id !== "" && selectData.responsible_subdepartment_id === "2" && (
            <div className="select-section">
              <PositionSelect
                onChange={handleGetDataFormSelect}
                filterBy={selectData.responsible_subdepartment_id}
                value={selectData.responsible_position_id}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="select-section">
            <SubDepartmenSelect
              onChange={handleGetDataFormSelect}
              filterBy={currentUser.dep}
              value={selectData.responsible_subdepartment_id}
            />
          </div>
          {selectData.responsible_subdepartment_id !== "" && (
            <div className="select-section">
              <PositionSelect
                onChange={handleGetDataFormSelect}
                // filterBy={currentUser.subDep}
                filterBy={selectData.responsible_subdepartment_id}
                value={selectData.responsible_position_id}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
