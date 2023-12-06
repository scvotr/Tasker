import { useState } from "react";
import { Modal } from "../../../Modal/Modal";
import { VenchelTableView } from "../VenchelTableView/VenchelTableView"
import { VenchelForm } from "../VenchelForm/VenchelForm";

export const VenchelTableComponent = ({ dep, sector, venchels, reRender }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={openModal}>Добавить</button>
      {showModal && (
        <Modal isOpen={openModal} onClose={closeModal}>
          <VenchelForm dep={dep} sector={sector} reRender={reRender} />
        </Modal>
      )}

      <VenchelTableView data={venchels} reRender={reRender}/>
    </>
  );
};
