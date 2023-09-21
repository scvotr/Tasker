import "./Login.css";
import { useState } from "react";
import { HOST_ADDR } from "../../../utils/ApiHostAdres";
import { sendAuthData } from "./API/sendAuthData";

const initValue = { name: "", password: "" };

export const Login = () => {
  const [formData, setFormData] = useState(initValue);
  const [reqStatus, setReqStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReqStatus(null);
    sendAuthData(formData, HOST_ADDR, setReqStatus);
    setFormData(initValue);
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__message">{reqStatus !== null ? <p>{reqStatus}</p> : <></>}</div>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login__input"
            placeholder="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="login__input"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login__submit-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
