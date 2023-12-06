import { useState } from "react";
import { Modal } from "../../../Modal/Modal";
import { VenchelFormV2 } from "../VenchelFormV2/VenchelFormV2";
import { VenchelTableView } from "../VenchelTableView/VenchelTableView";
import { VenchelTableComponentButtonGroup } from "./VenchelTableButtonGroup/VenchelTableComponentButtonGroup";

export const VenchelTableComponent = ({dep, current_dep, reRender}) => {
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
            dep = {dep}
            reRender={reRender}
          />
        </Modal>
      )}

      <VenchelTableComponentButtonGroup currentDep ={dep}/>

      <VenchelTableView data={current_dep} reRender = {reRender}/>

    </>
  );
};
