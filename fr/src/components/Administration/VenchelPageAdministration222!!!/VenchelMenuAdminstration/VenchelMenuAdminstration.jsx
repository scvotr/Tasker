import { NavLink } from "react-router-dom";

export const VenchelMenuAdminstration = () => {
  return (
    <div className="admin-menu">
      <div className="admin-menu__container">
        <div className="admin-menu__container-nav">
          <NavLink to='/elevator_ae' className={({ isActive }) => (isActive ? "active" : "")}>
            <button className="admin-menu__button">Алексиково</button>
          </NavLink>
          <NavLink to='/elevator_pe' className={({ isActive }) => (isActive ? "active" : "")}>
            <button className="admin-menu__button">Панфилово</button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}