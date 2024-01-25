import './V2UserButtonGroup.css'

export const V2UserButtonGroup = ({
  selectedButton,
  handleButtonClick,
  // 
  appoinNewTasks,
  approvedAppoinTasks,
  appoinTasksInWork,
  needApproveToCloseAppoinTasks,
  closedAppointTasks,
  // 
  responsibleTasksInWork,
  approvedResponsibleTasks,
  needApproveToCloseResponsibleTasks,
  closedResponsibleTasks,
}) => {
  const outBtn = [
    {key: 'createdTasks', label: 'Исх. Созданые', value: appoinNewTasks, color: '#0099CC'},
    {key: 'approved', label: 'Исх Согласованные', value: approvedAppoinTasks , color: '#0099CC'},
    {key: 'inWorkTask', label: 'Исх В работе', value: appoinTasksInWork, color: '#0099CC'},
    {key: 'needChekTask', label: 'Исх Подтвердить', value: needApproveToCloseAppoinTasks, color: '#0099CC'},
    {key: 'closedTask', label: 'Исх Закрытые', value: closedAppointTasks, color: '#0099CC'},
    // 
    // {key: 'res_inWorkTask', label: 'Вхд. в работе', value: responsibleTasksInWork, color: '#FF78AE'},
    // {key: 'res_approved', label: 'Вхд согласованные', value: approvedResponsibleTasks, color: '#FF78AE' },
    // {key: 'res_needChekTask', label: 'Вхд на подтверждении', value: needApproveToCloseResponsibleTasks, color: '#FF78AE'},
    // {key: 'res_closedTask', label: 'Вхд закрытые', value: closedResponsibleTasks, color: '#FF78AE'},
  ]

  const inputBtn = [
    {key: 'res_inWorkTask', label: 'Вхд. в работе', value: responsibleTasksInWork, color: '#FF78AE'},
    {key: 'res_approved', label: 'Вхд согласованные', value: approvedResponsibleTasks, color: '#FF78AE' },
    {key: 'res_needChekTask', label: 'Вхд на подтверждении', value: needApproveToCloseResponsibleTasks, color: '#FF78AE'},
    {key: 'res_closedTask', label: 'Вхд закрытые', value: closedResponsibleTasks, color: '#FF78AE'},
  ]

  return (
    <div className="user-button-group">
      <div className='test1'>

        {outBtn.map((button) => (
          <button 
            className='user-task__button'
            key={button.key}
            onClick={()=> handleButtonClick(button.key)}
            style={{
              backgroundColor: selectedButton === button.key ? "green" : ""
            }}
          >
            {button.label} {button.value}
          </button>
        ))}
      </div>
      <div className='test1'>
        {inputBtn.map((button) => (
          <button 
            className='user-task__button'
            key={button.key}
            onClick={()=> handleButtonClick(button.key)}
            style={{
              backgroundColor: selectedButton === button.key ? "green" : ""
            }}
          >
            {button.label} {button.value}
          </button>
        ))}
      </div>
    </div>
  )
}

V2UserButtonGroup.defaultProps = {

}