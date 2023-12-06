export const AeButtonGroup = ({
  selectedButton,
  handleButtonClick,
}) => {
  return (
    <>
      <div class="button-container">
        <button
          onClick={() => handleButtonClick("dep_ae")}
          style={{
            backgroundColor: selectedButton === "dep_ae" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          1 элеватор:
          {/* Алексиковский:{venchelAeCount} */}
        </button>
        <button
          onClick={() => handleButtonClick("dep_pe")}
          style={{
            backgroundColor: selectedButton === "dep_pe" ? "grey" : "",
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
