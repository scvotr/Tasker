import "./RenderTasksTable.css";
import { TasksTableVIew } from "../TasksTableVIew/TasksTableVIew";

export const RenderTasksTable = ({ tasks, actionType, onTaskSubmit }) => {
  return <TasksTableVIew tasks={tasks} actionType={actionType} test={onTaskSubmit} />;
};

RenderTasksTable.defaultProps = {
  tasks: [],
  actionType: "viewOnly",
  onTaskSubmit: () => {},
};
