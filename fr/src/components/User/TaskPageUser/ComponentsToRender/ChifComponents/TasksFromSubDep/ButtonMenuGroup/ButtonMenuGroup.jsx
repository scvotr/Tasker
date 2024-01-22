import "./ButtonMenuGroup.css";

export const ButtonMenuGroup = ({
  handleButtonClick,
  selectedButton,
  tasksInWork,
  tasksToApprove,
  approvedTasks,
  tasksWasClosed,
  tasksNeedConfirm,
}) => {
  return (
    <div className="user-button-group">
      <button
        onClick={() => handleButtonClick("toApprove")}
        style={{
          backgroundColor: selectedButton === "toApprove" ? "green" : "",
        }}
      >
        Согласовать {tasksToApprove}
      </button>
      <button
        onClick={() => handleButtonClick("inWork")}
        style={{
          backgroundColor: selectedButton === "inWork" ? "green" : "",
        }}
      >
        В работе {tasksInWork}
      </button>
      <button
        onClick={() => handleButtonClick("approved")}
        style={{
          backgroundColor: selectedButton === "approved" ? "green" : "",
        }}
      >
        Не назначен ответсвенный {approvedTasks}
      </button>
      <button
        onClick={() => handleButtonClick("completed")}
        style={{
          backgroundColor: selectedButton === "completed" ? "green" : "",
        }}
      >
        Закрытые задачи {tasksWasClosed}
      </button>
    </div>
  );
};
