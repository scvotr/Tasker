import "./UserButtonGroup.css";

export const UserButtonGroup = ({
  selectedButton,
  handleButtonClick,
  onConfirmLenght,
  createdTasks,
  tasksInWork,
  onApproval,
  approvedTasks,
  closed,
  onControl,
}) => {
  return (
    <div className="user-button-group">
      <button
        onClick={() => handleButtonClick("createdTasks")}
        style={{
          backgroundColor: selectedButton === "createdTasks" ? "green" : "",
        }}
      >
        Созданные задачи {createdTasks}
      </button>
      <button
        onClick={() => handleButtonClick("approved")}
        style={{
          backgroundColor: selectedButton === "approved" ? "green" : "",
        }}
      >
        Согласованны {approvedTasks}
      </button>
      <button
        onClick={() => handleButtonClick("inWorkTask")}
        style={{
          backgroundColor: selectedButton === "inWorkTask" ? "green" : "",
        }}
      >
        В работе {tasksInWork}
      </button>
      <button
        onClick={() => handleButtonClick("needChekTask")}
        style={{
          backgroundColor: selectedButton === "needChekTask" ? "green" : "",
        }}
      >
        На проверке {onConfirmLenght}
      </button>
      <button
        onClick={() => handleButtonClick("closedTask")}
        style={{
          backgroundColor: selectedButton === "closedTask" ? "green" : "",
        }}
      >
        Закрытые задачи {closed}
      </button>
    </div>
  );
};

UserButtonGroup.defaultProps  = {
  createdTasks: '',
  approvedTasks: '',
  tasksInWork: '',
  onConfirmLenght: '',
  closed: '',
};
