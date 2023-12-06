import { useState } from "react";
import { Modal } from "../../../Modal/Modal";
import { VenchelFormV2 } from "../../VenchelPageAdministration222/VenchelFormV2/VenchelFormV2";

export const VenchelTableComponent = ({ dep, venchels, reRender }) => {
  console.log("VenchelTableComponent", dep, venchels);
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
          <VenchelFormV2 dep={dep} reRender={reRender} />
        </Modal>
      )}
    </>
  );
};
