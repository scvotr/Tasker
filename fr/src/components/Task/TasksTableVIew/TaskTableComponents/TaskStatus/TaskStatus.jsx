import "./TaskStatus.css";

export const TaskStatus = ({ staus }) => {
  console.log('staus', staus)
  let taskStatus;
  if (staus === "inWork") {
    taskStatus = "В работе";
  } else if (staus === "closed") {
    taskStatus = "Закрыта";
  } else if(staus === "approved"){
    taskStatus = "Согласованна";
  } else if(staus === "needToConfirm"){
    taskStatus = "На подтверждении";
  } 

  return <>{taskStatus}</>;
};
