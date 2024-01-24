import "./ChifButtonGroup.css";

export const ChifButtonGroup = ({
  selectedButton,
  handleButtonClick,
  taskToApprove,
  fromDepLength,
  toDepLength,
}) => {
  return (
    <>
      <div className="button-container">
        <button
          onClick={() => handleButtonClick("allTasksFromSubDep")}
          style={{
            backgroundColor:
              selectedButton === "allTasksFromSubDep" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          Задачи от СОТРУДНИКОВ отдела. Всего задач:{fromDepLength}
        </button>
        <button
          onClick={() => handleButtonClick("allTasksToSubDep")}
          style={{
            backgroundColor:
              selectedButton === "allTasksToSubDep" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          Задачи для отдела (так же внутрении задачи).  Всего задач: {toDepLength}
        </button>
      </div>
    </>
  );
};

ChifButtonGroup.defaultProps = {
  taskToApprove: 0,
  taskCreated: 0,
  allDepsTask: 0,
  tasksToDepLenght: 0,
};
