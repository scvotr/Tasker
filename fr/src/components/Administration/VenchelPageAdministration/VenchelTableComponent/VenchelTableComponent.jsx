import { useState, useEffect } from "react";
import { Modal } from "../../../Modal/Modal";
import { VenchelFormV2 } from "../VenchelFormV2/VenchelFormV2";
import { VenchelTableView } from "../VenchelTableView/VenchelTableView";

export const VenchelTableComponent = ({current_dep, reRender}) => {
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
          <VenchelFormV2
            reRender={reRender}
          />
        </Modal>
      )}

      <VenchelTableView data={current_dep} reRender = {reRender}/>

    </>
  );
};
