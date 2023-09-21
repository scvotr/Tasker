import "./FormEditUser.css";
import { useState, useEffect } from "react";
import { DepartmentSelect } from "../../../../SelectFields/HoldinStuct/Dep/DepartmentSelect";
import { SubDepartmenSelect } from "../../../../SelectFields/HoldinStuct/SubDep/SubDepartmenSelect";
import { PositionSelect } from "../../../../SelectFields/HoldinStuct/Position/PositionSelect";

export const FormEditUser = ({ user, onSubmit, onCancel }) => {
  const [editUser, setEditUser] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    department_id: user.department_id,
    subdepartment_id: user.subdepartment_id,
    position_id: user.position_id,
  });

  useEffect(() => {
    setEditUser({
      name: user.name,
      email: user.email,
      role: user.role,
      department_id: user.department_id,
      subdepartment_id: user.subdepartment_id,
      position_id: user.position_id,
    });
  }, [user]);

  // изменения в текстовых полях
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // изменения в селектах
  const handleGetDataFormSelect = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ id: user.id, ...editUser });
  };

  const handleCancelEdit = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      <label htmlFor="name">
        Имя:
        <input
          type="text"
          id="name"
          name="name"
          value={editUser.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          id="email"
          name="email"
          value={editUser.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="role">
        Роль:
        <input
          type="text"
          id="role"
          name="role"
          value={editUser.role}
          onChange={handleChange}
        />
      </label>
      <label>
        <DepartmentSelect
          value={editUser.department_id}
          onChange={handleGetDataFormSelect}
        />
      </label>
      <label>
        <SubDepartmenSelect
          value={editUser.subdepartment_id}
          onChange={handleGetDataFormSelect}
          filterBy={editUser.department_id}
        />
      </label>
      <label>
        <PositionSelect
          value={editUser.position_id}
          onChange={handleGetDataFormSelect}
          filterBy={editUser.subdepartment_id}
        />
      </label>

      <div className="btn-group">
        <button className="btn" type="submit">Сохранить</button>
        <button className="btn" onClick={handleCancelEdit}>Отменить</button>
      </div>
    </form>
  );
};
