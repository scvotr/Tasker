export const PeButtonGroup = ({
  selectedButton,
  handleButtonClick,
  testLenght,
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
          1 элеватор: {testLenght.sc_3_l}
          {/* Алексиковский:{venchelAeCount} */}
        </button>
        <button
          onClick={() => handleButtonClick("dep_pe_2")}
          style={{
            backgroundColor: selectedButton === "dep_pe_2" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          2 элеватор: {testLenght.sc_4_l}
          {/* Панфиловский: {venchelPeCount} */}
        </button>
        <button
          onClick={() => handleButtonClick("dep_pe_3")}
          style={{
            backgroundColor: selectedButton === "dep_pe_3" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          5 склад: {testLenght.sc_5_l}
          {/* Панфиловский: {venchelPeCount} */}
        </button>
        <button
          onClick={() => handleButtonClick("dep_pe_4")}
          style={{
            backgroundColor: selectedButton === "dep_pe_4" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          Склады: {testLenght.sc_6_l}
          {/* Панфиловский: {venchelPeCount} */}
        </button>
      </div>
    </>
  );
};
