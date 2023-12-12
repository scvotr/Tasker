import { useState } from "react";
import './InTableVenchelForm.css'
import { VenchelForm } from "../../VenchelForm/VenchelForm";

export const InTableVenchelForm = ({ data, reRender }) => {
  console.log(data)
  const [selectedVenchel, setSelectedVencel] = useState(null);

  const openForm = (venchel) => {
    setSelectedVencel(venchel);
  };

  const closeForm = () => {
    setSelectedVencel(null);
  };

  return (
    <>
      <table className="venchel-table__container">
        <thead className="venchel-thead__container">
          <tr>
            <th>ID</th>
            <th>Высота</th>
            <th>Размещение</th>
            <th>Марка</th>
            <th>Номер</th>
            <th>Позиция</th>
            <th>Мощьность</th>
            <th>Тип</th>
            <th>Длина</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <>
                <tr key={item.venchel_id} onClick={() => openForm(item)}>
                  <td>{item.venchel_id.substring(0, 3)}</td>
                  <td>{item.height}</td>
                  <td>{item.location}</td>
                  <td>{item.model}</td>
                  <td>{item.pos_num}</td>
                  <td>{item.position}</td>
                  <td>{item.power}</td>
                  <td>{item.type}</td>
                  <td>{item.width}</td>
                </tr>
                {selectedVenchel && selectedVenchel.venchel_id === item.venchel_id && (
                  <tr>
                    <td colSpan={9}>
                      <VenchelForm
                        keyProp={item.venchel_id}
                        reRender={reRender}
                        selectedVenchel={selectedVenchel}
                        closeForm={closeForm}
                      />
                    </td>
                  </tr>
                )}
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};
