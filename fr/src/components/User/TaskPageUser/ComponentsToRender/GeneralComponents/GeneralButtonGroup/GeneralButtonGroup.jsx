import "./GeneralButtonGroup.css";

export const GeneralButtonGroup = ({
  selectedButton,
  handleButtonClick,
  taskFromDep,
  taskToDep,
}) => {
  return (
    <div class="button-container">
      <button
        onClick={() => handleButtonClick("allTasksFromDep")}
        style={{
          backgroundColor:
            selectedButton === "allTasksFromDep" ? "grey" : "",
        }}
        className="user-menu__button"
      >
        Задачи от Департамента. Всего задач:{taskFromDep}
      </button>
      <button
        onClick={() => handleButtonClick("allTasksToDep")}
        style={{
          backgroundColor: selectedButton === "allTasksToDep" ? "grey" : "",
        }}
        className="user-menu__button"
      >
        Задачи для Департамента. Всего задач: {taskToDep}
      </button>
    </div>
  );
};

GeneralButtonGroup.defaultProps = {
  taskToDep: 0,
  taskFromDep: 0,
};
