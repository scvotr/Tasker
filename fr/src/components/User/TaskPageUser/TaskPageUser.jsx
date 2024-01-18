import "./TaskPageUser.css";
import { MainMenuUser } from "../MainMenuUser/MainMenuUser";
import { TasksView } from "./TasksView/TasksView";

export const TaskPageUser = () => {
  return (
    <div className="user-task-page">
      <MainMenuUser />
      <div className="user-task-page__body">
        <div className="user-task-page__container">
          <TasksView />
        </div>
      </div>
    </div>
  );
};