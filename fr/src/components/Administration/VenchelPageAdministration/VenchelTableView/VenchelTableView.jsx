import { useState } from "react";
import { Modal } from "../../../Modal/Modal";
import { VenchelForm } from "../VenchelForm/VenchelForm";


export const VenchelTableView = ({ data, reRender }) => {
  const [selectedVenchel, setSelectedVencel] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (venchel) => {
    setSelectedVencel(venchel);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedVencel(null);
    setModalOpen(false);
  };

  const [taskFormKey, setTaskFormKey] = useState(0);

  const handleReRenderByModal = (isUpdate) => {
    setTaskFormKey((prevKey) => prevKey + 1);
  }

  return (
    <>
      <>
        {selectedVenchel && (
          <Modal isOpen={openModal} onClose={closeModal}>
            <VenchelForm keyProp={taskFormKey} reRender = {reRender} selectedVenchel = {selectedVenchel}/>
          </Modal>
        )}
      </>
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
              <tr key={item.id} onClick={() => openModal(item)}>
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
            ))}
        </tbody>
      </table>
    </>
  );
};
