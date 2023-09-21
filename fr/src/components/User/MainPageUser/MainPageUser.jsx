import { MainMenuUser } from "../MainMenuUser/MainMenuUser";
import "./MainPageUser.css";

export const MainPageUser = () => {
  return (
    <div className="user-main-page">
      <div className="user-main-page__containre"></div>
      <div className="user-main-page__containre">
        <MainMenuUser/>
      </div>
    </div>
  );
};
