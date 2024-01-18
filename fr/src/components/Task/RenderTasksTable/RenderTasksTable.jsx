import "./RenderTasksTable.css";
import { TasksTableVIew } from "../TasksTableVIew/TasksTableVIew";

export const RenderTasksTable = ({ tasks, actionType, onTaskSubmit, rowForPage }) => {
  return <TasksTableVIew tasks={tasks} actionType={actionType} test={onTaskSubmit} rowForPage={rowForPage}/>;
};

RenderTasksTable.defaultProps = {
  tasks: [],
  actionType: "viewOnly",
  onTaskSubmit: () => {},
  rowForPage: '10',
};
