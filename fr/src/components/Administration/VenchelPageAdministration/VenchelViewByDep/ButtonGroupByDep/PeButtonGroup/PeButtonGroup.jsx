export const PeButtonGroup = ({
  selectedButton,
  handleButtonClick,
}) => {
  return (
    <>
      <div className = "button-container">
        <button
          onClick={() => handleButtonClick("dep_pe_1")}
          style={{
            backgroundColor: selectedButton === "dep_pe_1" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          1 элеватор:
          {/* Алексиковский:{venchelAeCount} */}
        </button>
        <button
          onClick={() => handleButtonClick("dep_pe_2")}
          style={{
            backgroundColor: selectedButton === "dep_pe_2" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          2 элеватор: 
          {/* Панфиловский: {venchelPeCount} */}
        </button>
        <button
          onClick={() => handleButtonClick("dep_pe_3")}
          style={{
            backgroundColor: selectedButton === "dep_pe_3" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          5 склад: 
          {/* Панфиловский: {venchelPeCount} */}
        </button>
        <button
          onClick={() => handleButtonClick("dep_pe_4")}
          style={{
            backgroundColor: selectedButton === "dep_pe_4" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          Склады: 
          {/* Панфиловский: {venchelPeCount} */}
        </button>
      </div>
    </>
  );
};
