import "./TableUserView.css";
import { useState } from "react";
import { FormEditUser } from "./FormEditUser/FormEditUser";

export const TableUserView = ({ users, onUpdate }) => {
  const [isEditAction, setIsEditAction] = useState({ isEdit: false });
  const [userDataToEdit, setUserDataToEdit] = useState([]);

  const handleEditActionOpen = (user) => {
    setIsEditAction({ isEdit: true });
    setUserDataToEdit(user);
  };

  const handleCancelEditActionCancel = () => {
    setIsEditAction({ isEdit: false });
  };

  const handleSendUpdatedUserData = (user) => {
    onUpdate(user);
  };

  const handleClickDelet = (user) => {
    console.log("Write user remove code");
  };

  //31.08.2023
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const handleSortClick = (column) => {
    if (column === sortedColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortDirection("asc");
    }

    if(sortedColumn) {
      users.sort((a, b)=> {
        const valueA = a[sortedColumn];
        const valueB = b[sortedColumn];

        if (sortDirection === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      })
    }
  };

  return (
    <>
      {users && (
        <>
          {isEditAction.isEdit && (
            <FormEditUser
              user={userDataToEdit}
              onSubmit={handleSendUpdatedUserData}
              onCancel={handleCancelEditActionCancel}
            />
          )}
          <table className="edit-user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Email</th>
                <th onClick={() => handleSortClick("role")}>Роль</th>
                <th onClick={() => handleSortClick("department")}>Подразделение</th>
                <th onClick={() => handleSortClick("subdepartment")}>Отдел</th>
                <th onClick={() => handleSortClick("position")}>Должность</th>
                <th>Редактирование</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id} </td>
                    <td>{user.name} </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.department}</td>
                    <td>{user.subdepartment}</td>
                    <td>{user.position}</td>
                    <td>
                      <button onClick={() => handleEditActionOpen(user)}>
                        Изменить
                      </button>
                      <button onClick={() => handleClickDelet(user)}>
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
