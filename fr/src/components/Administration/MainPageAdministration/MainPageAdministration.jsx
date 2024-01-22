import './MainPageAdministration.css'
import { MainMenuAdministration } from '../MainMenuAdministration/MainMenuAdministration';
import { useAuthContext } from '../../../context/AuthProvider'

export const MainPageAdministration = ({currentUser}) => {
  const currtUser = useAuthContext()
  if (!currtUser.login) {
    return null; // Если currentUser.login не существует, вернуть null (ничего не отображать)
  }
  
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