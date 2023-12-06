import React from 'react';
import './VenchelTextFields.css';

export const VenchelTextFields = ({ getData, value, isEdit, handleFileInput }) => {
  // Создаем массив fields
  const fields = [
    { name: "position", label: "Позиция" },
    { name: "type", label: "Тип" },
    { name: "pos_num", label: "Номер" },
    { name: "model", label: "Модель" },
    { name: "location", label: "Расположение" },
    { name: "power", label: "Мощность" },
    { name: "length", label: "Длина" },
    { name: "height", label: "Высота" }
  ];

  return (
    <div className="text-fields__container">
      {fields && fields.map((field) => (
        <label key={field.name}>
          {field.label}:
          <input
            type="text"
            name={field.name}
            value={value[field.name]}
            onChange={getData}
          />
        </label>
      ))}
      <label>
        pic
        <div>
          <input
            className="form-input__file"
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

// import './VenchelTextFields.css'

// export const VenchelTextFields = ({ getData, value, isEdit, handleFIleInput }) => {
//   return (
//     <div className="text-fields__container">
//       <label>
//         Позиция: 
//         <input
//           type="text"
//           name="position"
//           value={value.position}
//           onChange={getData}
//         />
//       </label>
//       <label>
//         Тип: 
//         <input
//           type="text"
//           name="type"
//           value={value.type}
//           onChange={getData}
//         />
//       </label>
//       <label>
//         Номер: 
//         <input
//           type="text"
//           name="pos_num"
//           value={value.pos_num}
//           onChange={getData}
//         />
//       </label>
//       <label>
//         Модель: 
//         <input
//           type="text"
//           name="model"
//           value={value.model}
//           onChange={getData}
//         />
//       </label>
//       <label>
//         Расположени: 
//         <input
//           type="text"
//           name="location"
//           value={value.location}
//           onChange={getData}
//         />
//       </label>
//       <label>
//         Мощьность: 
//         <input
//           type="text"
//           name="power"
//           value={value.power}
//           onChange={getData}
//         />
//       </label>
//       <label>
//         Длина: 
//         <input
//           type="text"
//           name="length"
//           value={value.length}
//           onChange={getData}
//         />
//       </label>
//       <label>
//         Высота: 
//         <input
//           type="text"
//           name="height"
//           value={value.height}
//           onChange={getData}
//         />
//       </label>
//       <label>
//         pic
//         <div>
//           <input
//             className="form-input__file"
//             type="file"
//             onChange={getData}
//             name={isEdit ? "append_new_files" : "add_new_files"}
//             accept="image/jpeg, image/png"
//             multiple
//             onInput={handleFIleInput}
//           />
//         </div>
//       </label>
//     </div>
//   );
// };
