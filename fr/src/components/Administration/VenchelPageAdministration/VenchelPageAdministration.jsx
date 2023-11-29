import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration";
import "./VenchelPageAdministration.css";
import { Modal } from "../../Modal/Modal.jsx";
import { useState } from "react";
import { AddNewVenchel } from "./AddNewVenchel/AddNewVenchel.jsx";

export const VenchelPageAdministration = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-venchel-page">
      <div className="admin-venchel-page__container">
        Редактирование оборудования
      </div>
      <div className="admin-venchel-page__container">
        <MainMenuAdministration />
      </div>
      <div className="admin-venchel__body">
        <button onClick={openModal}>Add</button>
        {showModal && (
          <Modal isOpen={openModal} onClose={closeModal}>
            <AddNewVenchel />
          </Modal>
        )}
      </div>
    </div>
  );
};
