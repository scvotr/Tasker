import { MainMenuAdministration } from '../MainMenuAdministration/MainMenuAdministration';
import "./VenchelPageAdministration.css";

export const VenchelPageAdministration = () => {
  return (
    <div className="admin-venchel-page">
      <div className="admin-venchel-page__container">Редактирование оборудования</div>
      <div className="admin-venchel-page__container">
        <MainMenuAdministration />
      </div>
      <div className="admin-venchel__body">
        оборудование
      </div>
    </div>
  );
};
