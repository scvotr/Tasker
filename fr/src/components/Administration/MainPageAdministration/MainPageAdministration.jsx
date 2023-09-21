import './MainPageAdministration.css'
import { MainMenuAdministration } from '../MainMenuAdministration/MainMenuAdministration';

export const MainPageAdministration = ({currentUser}) => {
  return (
    <div className="admin-main-page">
      <div className="admin-main-page__container">
        <MainMenuAdministration currentUser={currentUser}/>
      </div>
      <div className="admin-main-page__container">
      </div>
    </div>
  );
};