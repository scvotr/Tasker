

export const VenchelButtonGroup = ({
  selectedButton,
  handleButtonClick,
  venchelAeCount,
  venchelPeCount,
}) => {
  return (
     <>
      <div className="button-container">
        <button
          onClick={() => handleButtonClick("dep_ae")}
          style={{
            backgroundColor:
              selectedButton === "dep_ae" ? "grey" : "",
          }}
          className="user-menu__button"
        >
         Алексиковский:{venchelAeCount}
        </button>
        <button
          onClick={() => handleButtonClick("dep_pe")}
          style={{
            backgroundColor:
              selectedButton === "dep_pe" ? "grey" : "",
          }}
          className="user-menu__button"
        >
          Панфиловский: {venchelPeCount}
        </button>
      </div>
    </>
  )
}

VenchelButtonGroup.defaultProps = {
  venchelAeCount: 0,
  venchelPeCount: 0,
}