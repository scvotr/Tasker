import './TextDataField.css'

export const TextDataField = (props) => {
  const { getData, value } = props; 

  const handelGetData = (e) => {
    getData(e);
  };

  return (
    <div className='test-fields'>
      <textarea
        className="form-input__task"
        type="text"
        name="task_descript"
        value={props.value.task_descript}
        placeholder="Описание задачи..."
        onChange={handelGetData}
        required
      ></textarea>
      {/* <label>
        Срочно
        <input
          className="form__input"
          type="checkbox"
          name="task_priority"
          onChange={handelGetData}
        ></input>
      </label> */}
      <label>
        Выполнить до: <br></br>
        <input
          className="form__input"
          type="date"
          name="deadline"
          value={props.value.deadline}
          onChange={handelGetData}
          min={new Date().toISOString().split("T")[0]}
          required
        ></input>
      </label>
      {/* <textarea
        className="form__comment"
        type="text"
        placeholder="Комментарий..."
        name="task_comment"
        value={props.value.task_comment}
        onChange={handelGetData}
      ></textarea> */}
    </div>
  );
};
