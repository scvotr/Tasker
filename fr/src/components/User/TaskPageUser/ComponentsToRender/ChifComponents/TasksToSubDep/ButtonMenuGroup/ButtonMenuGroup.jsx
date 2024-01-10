import './ButtonMenuGroup.css'

export const ButtonMenuGroup = ({selectedButton, handleButtonClick, notResponcer, workingNow, onConfirm, wasClosed}) => {
  return (
    <div className="user-button-group">
      <button
        onClick={()=>handleButtonClick('inWork')}
        style={{
          backgroundColor:
            selectedButton === "inWork" ? "green" : "",
        }}
      >
        В работе {workingNow}
      </button>
      <button
        onClick={()=>handleButtonClick('needToApprove')}
        style={{
          backgroundColor:
            selectedButton === "needToApprove" ? "green" : "",
        }}
      >
       Не назначен исполнитель {notResponcer}
      </button>
      <button
        onClick={()=>handleButtonClick('onConfirm')}
        style={{
          backgroundColor:
            selectedButton === "onConfirm" ? "green" : "",
        }}
      >
        Исполненые (на проверке) {onConfirm}
      </button>
      <button
        onClick={()=>handleButtonClick('closed')}
        style={{
          backgroundColor:
            selectedButton === "closed" ? "green" : "",
        }}
      >
        Закрытые {wasClosed}
      </button>
      {/* <button
        onClick={()=>handleButtonClick('needConfirm')}
        style={{
          backgroundColor:
            selectedButton === "needConfirm" ? "green" : "",
        }}
      >
        Требуют подтверждение о выполнении
      </button> */}
      {/* <button
        onClick={()=>handleButtonClick('closed')}
        style={{
          backgroundColor:
            selectedButton === "closed" ? "green" : "",
        }}
      >
        Закрытые
      </button> */}
    </div>
  )
}