import "./Registration.css";
import { useState } from "react";
import { HOST_ADDR } from "../../../utils/ApiHostAdres";
import { sendRegData } from "./API/sendRegData";

const initValue = { name: "", email: "", password: "" };

export const Registration = () => {
  const [formData, setFormData] = useState(initValue);
  const [reqStatus, setReqStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRegData(formData, HOST_ADDR, setReqStatus);
    setFormData(initValue);
  };

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="registration__message">
          {reqStatus !== null ? <p>{reqStatus}</p> : <></>}
        </div>
        <form className="registration__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="registration__input"
            placeholder="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="registration__input"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="registration__input"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="registration__submit-button">
            Зарегистрироватся
          </button>
        </form>
      </div>
    </div>
  );
};
