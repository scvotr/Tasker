import { useState, useEffect } from "react";
import { Modal } from "../../../Modal/Modal";
import { VenchelFormV2 } from "../VenchelFormV2/VenchelFormV2";
import { VenchelTableView } from "../VenchelTableView/VenchelTableView";

export const VenchelTableComponent = ({data, reRender}) => {
  const [showModal, setShowModal] = useState(false);
  const [taskFormKey, setTaskFormKey] = useState(0);

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
            keyProp={taskFormKey}
            reRender={reRender}
          />
        </Modal>
      )}

      <VenchelTableView data={data}/>

    </>
  );
};
