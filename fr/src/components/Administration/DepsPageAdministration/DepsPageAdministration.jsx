import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration";
import { HOST_ADDR } from "../../../utils/ApiHostAdres";
import { useAuthContext } from "../../../context/AuthProvider";
import { useState, useEffect } from "react";
import "./DepsPageAdministration.css";
import { DepartmentSelect } from "../../SelectFields/HoldinStuct/Dep/DepartmentSelect";
import { SubDepartmenSelect } from "../../SelectFields/HoldinStuct/SubDep/SubDepartmenSelect";
import { PositionSelect } from "../../SelectFields/HoldinStuct/Position/PositionSelect";
import { sendDataToEndpoint } from "../../../utils/sendDataToEndpoint";

export const sendNewDep = async (token, dep_name, apiHostAddr, onSuccess) => {
  try {
    const res = await fetch(apiHostAddr + "/admin/createNewDep", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dep_name),
    });

    const resType = res.headers.get("Content-Type");
    if (res.ok && resType && resType.includes("application/json")) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      onSuccess("Server response was not ok or content type is not JSON");
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error);
  }
};
export const removeDep = async (token, dep_id, apiHostAddr, onSuccess) => {
  try {
    const res = await fetch(apiHostAddr + "/admin/removeDep", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dep_id),
    });

    const resType = res.headers.get("Content-Type");
    if (res.ok && resType && resType.includes("application/json")) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      onSuccess("Server response was not ok or content type is not JSON");
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error);
  }
};
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

export const DepsPageAdministration = () => {
  const currentUser = useAuthContext();
  const [reqStatus, setReqStatus] = useState(null);
  const [newDepName, setNewDepName] = useState("");
  const [newSubDepName, setNewSubDepName] = useState("");
  const [newPositionName, setNewPositionName] = useState("");
  const [departments, setDepartments] = useState("");
  const [subDepartments, setSubDepartments] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSubDepartment, setSelectedSubDepartment] = useState("");

  const addNewDep = async (e) => {
    e.preventDefault();
    if (newDepName) {
      const data = {
        depName: newDepName,
      };
      try {
        setNewDepName("");
        await sendNewDep(currentUser.token, data, HOST_ADDR, setReqStatus);
      } catch (error) {}
    }
  };

  const addNewSubDep = async (e) => {
    e.preventDefault();
    if (newSubDepName && selectedDepartment) {
      const data = {
        dep_id: selectedDepartment,
        subDep_name: newSubDepName,
      };
      console.log("Создать", data);
      // добавить новый отдел
      try {
        await sendDataToEndpoint(
          currentUser.token,
          data,
          "/admin/createNewSubDep",
          "POST",
          setReqStatus
        )
      } catch (error) {
        
      }
    }
    console.log("Не выбрано");
  };

  useEffect(() => {
    try {
      getDepartments(currentUser.token, setReqStatus).then((data) =>
        setDepartments(data)
      );
      getSubDepartments(currentUser.token, setReqStatus).then((data) =>
        setSubDepartments(data)
      );
    } catch (error) {}
  }, [currentUser]);

  const getInput = (e) => {
    e.preventDefault();
    setNewDepName(e.target.value);
  };

  const handleRemoveDep = async (e) => {
    e.preventDefault();
    if (selectedDepartment) {
      try {
        console.log("remove", selectedDepartment);
        await removeDep(
          currentUser.token,
          selectedDepartment,
          HOST_ADDR,
          setReqStatus
        );
      } catch (error) {}
    }
  };

  const [edit, setEdit] = useState({
    department_id: "",
    subdepartment_id: "",
    position_id: "",
  });
  console.log("edit", edit);
  const handleGetDataFormSelect = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="admin-dep-page">
      <div className="admin-dep-page__container">Редактирование отделов</div>
      <div className="admin-dep-page__container">
        <MainMenuAdministration />
      </div>
      <div className="admin-dep__body">
        {/* -------------------------------------------------------------------- */}
        <form onSubmit={(e) => handleRemoveDep(e)}>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Выберите департамент</option>
            {departments &&
              departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
          </select>
          <button type="submit" onClick={(e) => handleRemoveDep(e)}>
            удалить
          </button>
        </form>
        {/* -------------------------------------------------------------------- */}
        <p>Добавить Департамент</p>
        <form onSubmit={addNewDep}>
          <input type="text" value={newDepName} onChange={getInput} />
          <button type="submit">создать</button>
        </form>
        {/* -------------------------------------------------------------------- */}
        <p>Добавить Отдел</p>
        <form onSubmit={addNewSubDep}>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Выберите департамент</option>
            {departments &&
              departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
          </select>
          <input
            type="text"
            value={newSubDepName}
            onChange={(e) => setNewSubDepName(e.target.value)}
          />
          <button type="submit">создать</button>
        </form>
        {/* -------------------------------------------------------------------- */}
        <p>Добавить Должность</p>
        <form onSubmit={(e) => addNewSubDep(e)}>
          <select
            value={selectedSubDepartment}
            onChange={(e) => setSelectedSubDepartment(e.target.value)}
          >
            <option value="">Выберите отдел</option>
            {subDepartments &&
              subDepartments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
          </select>
          <input
            type="text"
            value={newPositionName}
            onChange={(e) => setNewPositionName(e.target.value)}
          />
          <button type="submit">создать</button>
        </form>
      </div>
      {/* ----------------------------------------------------------------- */}
      <div>
        <hr></hr>
        <DepartmentSelect
          value={edit.department_id}
          onChange={handleGetDataFormSelect}
        />
        <SubDepartmenSelect
          value={edit.subdepartment_id}
          onChange={handleGetDataFormSelect}
          filterBy={edit.department_id}
        />
        <PositionSelect
          value={edit.position_id}
          onChange={handleGetDataFormSelect}
          filterBy={edit.subdepartment_id}
        />
      </div>
    </div>
  );
};

// import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration";
// import { HOST_ADDR } from "../../../utils/ApiHostAdres";
// import { useAuthContext } from "../../../context/AuthProvider";
// import { useState, useEffect } from "react";
// import "./DepsPageAdministration.css";

// export const sendNewDep = async (token, dep_name, apiHostAddr, onSuccess) => {
//   try {
//     const res = await fetch(apiHostAddr + "/admin/createNewDep", {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(dep_name),
//     });

//     const resType = res.headers.get("Content-Type");
//     if (res.ok && resType && resType.includes("application/json")) {
//       const resData = await res.json();
//       onSuccess(null);
//       return resData;
//     } else {
//       onSuccess("Server response was not ok or content type is not JSON");
//       throw new Error("Server response was not ok or content type is not JSON");
//     }
//   } catch (error) {
//     onSuccess(error);
//   }
// };
// export const removeDep = async (token, dep_id, apiHostAddr, onSuccess) => {
//   try {
//     const res = await fetch(apiHostAddr + "/admin/removeDep", {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(dep_id),
//     });

//     const resType = res.headers.get("Content-Type");
//     if (res.ok && resType && resType.includes("application/json")) {
//       const resData = await res.json();
//       onSuccess(null);
//       return resData;
//     } else {
//       onSuccess("Server response was not ok or content type is not JSON");
//       throw new Error("Server response was not ok or content type is not JSON");
//     }
//   } catch (error) {
//     onSuccess(error);
//   }
// };

// const getDepartments = async (token, onSuccess) => {
//   try {
//     const res = await fetch(HOST_ADDR + "/orgStruct/getDepartments", {
//       method: "POST",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json",
//       },
//     });

//     const resType = res.headers.get("Content-Type");
//     if (res.ok && resType && resType.includes("application/json")) {
//       const resData = await res.json();
//       onSuccess(null);
//       return resData;
//     } else {
//       throw new Error("Server response was not ok or content type is not JSON");
//     }
//   } catch (error) {
//     onSuccess(error);
//   }
// };

// export const DepsPageAdministration = () => {
//   const currentUser = useAuthContext();
//   const [reqStatus, setReqStatus] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   console.log("depatmets", departments);
//   const [selectedDepartment, setSelectedDepartment] = useState("");

//   const handleAddDepartment = async (departmentName) => {
//     const data = {
//       depName: departmentName,
//     };
//     try {
//       await sendNewDep(currentUser.token, data, HOST_ADDR, setReqStatus);
//     } catch (error) {}
//   };

//   const handleRemoveDep = async (e) => {
//     e.preventDefault();
//     if (selectedDepartment) {
//       try {
//         console.log('remove', selectedDepartment)
//         await removeDep(currentUser.token, selectedDepartment, HOST_ADDR, setReqStatus);
//       } catch (error) {}
//     }
//   };

//   useEffect(() => {
//     try {
//       getDepartments(currentUser.token, setReqStatus).then((data) =>
//         setDepartments(data)
//       );
//     } catch (error) {}
//   }, [currentUser]);

//   return (
//     <div className="admin-dep-page">
//       <div className="admin-dep-page__container">Редактирование отделов</div>
//       <div className="admin-dep-page__container">
//         <MainMenuAdministration />
//       </div>
//       <div className="admin-dep__body">
//         <form onSubmit={(e) => handleRemoveDep(e)}>
//           <select
//             value={selectedDepartment}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//           >
//             <option value="">Выберите департамент</option>
//             {departments &&
//               departments.map((department) => (
//                 <option key={department.id} value={department.id}>
//                   {department.name}
//                 </option>
//               ))}
//           </select>
//           <button type="submit" onClick={(e) => handleRemoveDep(e)}>
//             удалить
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
