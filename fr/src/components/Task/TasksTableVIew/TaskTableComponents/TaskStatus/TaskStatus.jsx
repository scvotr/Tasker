import "./TaskStatus.css";

export const TaskStatus = ({ staus }) => {
  let taskStatus;
  if (staus === "inWork") {
    taskStatus = "В работе";
  } else if (staus === "closed") {
    taskStatus = "Закрыта";
  } else if(staus === "approved"){
    taskStatus = "Согласованна";
  }

  return <>{taskStatus}</>;
};
