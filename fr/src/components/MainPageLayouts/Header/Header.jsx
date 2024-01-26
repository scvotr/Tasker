import "./Header.css";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthProvider";

export const Header = () => {
  const currentUser = useAuthContext();

  return (
    <header className="header">
      <div className="header__container">
        {currentUser.login ? (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <button className="header__button">На главную</button>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={currentUser.logout}
            >
              <button className="header__button">Выйти</button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <button className="header__button">На главную</button>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <button className="header__button">Войти</button>
            </NavLink>
            <NavLink
              to="/registration"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <button className="header__button">Регистрация</button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};
