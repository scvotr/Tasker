import { useState } from "react";
import { VenchelForm } from "../../VenchelForm/VenchelForm";

export const InTableVenchelForm = ({ data, reRender }) => {
  const [selectedVenchel, setSelectedVencel] = useState(null);

  const openForm = (venchel) => {
    setSelectedVencel(venchel);
  };

  const closeForm = () => {
    setSelectedVencel(null);
  };

  return (
    <>
      <table>
        <thead>
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
                <tr key={item.id} onClick={() => openForm(item)}>
                  <td>{item.id.substring(0, 3)}</td>
                  <td>{item.height}</td>
                  <td>{item.location}</td>
                  <td>{item.model}</td>
                  <td>{item.pos_num}</td>
                  <td>{item.position}</td>
                  <td>{item.power}</td>
                  <td>{item.type}</td>
                  <td>{item.width}</td>
                </tr>
                {selectedVenchel && selectedVenchel.id === item.id && (
                  <tr>
                    <td colSpan={9}>
                      <VenchelForm
                        keyProp={item.id}
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
