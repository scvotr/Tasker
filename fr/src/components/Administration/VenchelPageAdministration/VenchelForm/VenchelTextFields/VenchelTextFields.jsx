import "./VenchelTextFields.css";

export const VenchelTextFields = ({
  getData,
  value,
  isEdit,
  handleFileInput,
}) => {
  const fields = [
    { name: "position", label: "Позиция" },
    { name: "type", label: "Тип" },
    { name: "pos_num", label: "Номер" },
    { name: "model", label: "Модель" },
    { name: "location", label: "Расположение" },
    { name: "power", label: "Мощность" },
    { name: "length", label: "Длина" },
    { name: "height", label: "Высота" },
  ];

  return (
    <div className="text-fields__container">
      {fields &&
        fields.map((field) => (
          <div className="wraper">
            <label key={field.name} className="t-label">
              {field.label}: 
              <input
                className="t-input"
                type="text"
                name={field.name}
                value={value[field.name]}
                onChange={getData}
              />
            </label>
          </div>
        ))}
      <label>
        pic
        <div className="wraper">
          <input
            className="t-input"
            type="file"
            onChange={getData}
            name={isEdit ? "append_new_files" : "add_new_files"}
            accept="image/jpeg, image/png"
            multiple
            onInput={handleFileInput}
          />
        </div>
      </label>
    </div>
  );
};
