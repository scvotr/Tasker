import { useState } from "react";
import { Modal } from "../../../Modal/Modal";
import { VenchelFormV2 } from "../../VenchelPageAdministration222/VenchelFormV2/VenchelFormV2";

export const VenchelTableComponent = ({ dep, sector, venchels, reRender }) => {
  console.log("VenchelTableComponent      ", 'dep', dep, 'sector', sector,venchels);
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
          <VenchelFormV2 dep={dep} sector={sector} reRender={reRender} />
        </Modal>
      )}
    </>
  );
};
