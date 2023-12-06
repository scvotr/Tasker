export const AeButtonGroup = ({
  selectedButton,
  handleButtonClick,
}) => {
  return (
    <>
      <div className="button-container">
        <button
          onClick={() => handleButtonClick("dep_ae_1")}
          style={{
            backgroundColor: selectedButton === "dep_ae_1" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          1 элеватор:
          {/* Алексиковский:{venchelAeCount} */}
        </button>
        <button
          onClick={() => handleButtonClick("dep_ae_2")}
          style={{
            backgroundColor: selectedButton === "dep_ae_2" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          2 элеватор: 
          {/* Панфиловский: {venchelPeCount} */}
        </button>
      </div>
    </>
  );
};
