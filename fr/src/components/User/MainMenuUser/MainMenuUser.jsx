import "./MainMenuUser.css";
import { useAuthContext } from "../../../context/AuthProvider";
import { NavLink } from "react-router-dom";

export const MainMenuUser = () => {
  const currentUser = useAuthContext();

  return (
    <div className="user-menu">
      <div className="user-menu__container">
        <div className="user-menu__container-nav">
          <NavLink
            to="/taskPageUser"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button className="user-menu__button">Задачи</button>
          </NavLink>
          <NavLink
            to="/docsPageUser"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button className="user-menu__button">Документы</button>
          </NavLink>
        </div>

        <div className="user-menu__body">
          <div>Пользователь: {currentUser.name}</div>
        </div>
      </div>
    </div>
  );
};