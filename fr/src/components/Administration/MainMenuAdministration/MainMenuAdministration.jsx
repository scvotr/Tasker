import './MainMenuAdministration.css'
import { NavLink } from "react-router-dom";

export const MainMenuAdministration = ({currentUser}) => {

  return (
    <div className="admin-menu">
      <div className="admin-menu__container">
        <div className="admin-menu__container-nav">
          <NavLink to='/userPageAdministration' className={({ isActive }) => (isActive ? "active" : "")}>
            <button className="admin-menu__button">Пользователи</button>
          </NavLink>
          <NavLink to='/taskPageAdministration' className={({ isActive }) => (isActive ? "active" : "")}>
            <button className="admin-menu__button">Задачи</button>
          </NavLink>
          <NavLink to='/venchelPageAdministration' className={({ isActive }) => (isActive ? "active" : "")}>
            <button className="admin-menu__button">Оборудование</button>
          </NavLink>
          <NavLink to='/depsPageAdministration' className={({ isActive }) => (isActive ? "active" : "")}>
            <button className="admin-menu__button">Отделы и службы</button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}