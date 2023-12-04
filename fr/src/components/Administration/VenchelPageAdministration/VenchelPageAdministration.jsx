import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration";
import "./VenchelPageAdministration.css";
import { Modal } from "../../Modal/Modal.jsx";
import { useState, useEffect } from "react";
import { VenchelForm } from "./VenchelForm/VenchelForm.jsx";
import { VenchelFormV2 } from "./VenchelFormV2/VenchelFormV2.jsx";
import { useAuthContext } from "../../../context/AuthProvider.js";
import { HOST_ADDR } from "../../../utils/ApiHostAdres.js";
import { VenchelTableView } from "./VenchelTableView/VenchelTableView.jsx";
import { VenchelMenuAdminstration } from './VenchelMenuAdminstration/VenchelMenuAdminstration'
import { VenchelButtonGroup } from "./VenchelButtonGroup/VenchelButtonGroup.jsx";
import { VenchelTableComponent } from "./VenchelTableComponent/VenchelTableComponent.jsx";

const getAllVenchels = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/venchel/getAllVenchels", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error);
  }
};

const AE_ID = 3
const PE_ID = 4

export const VenchelPageAdministration = () => {
  const currentUser = useAuthContext()
  const [resStaus, setReqStatus] = useState(null)
  const [selectedButton, setSelectedButton] = useState() //!
 
  const [venchels, setVenchels] = useState()
  const [ae_venchels, setAe_venchels] = useState()
  const [pe_venchels, setPe_venchels] = useState()
  const [aeCount, setAeCount] = useState()
  const [peCount, setPeCount] = useState()

  // const [showModal, setShowModal] = useState(false)

  // const openModal = () => {
  //   setShowModal(true);
  // };
  // const closeModal = () => {
  //   setShowModal(false);
  // };

  const [taskFormKey, setTaskFormKey] = useState(0);

  const handleReRenderByModal = (isUpdate) => {
    setTaskFormKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
     if (currentUser.login) {
      try {
        getAllVenchels(currentUser.token, setReqStatus).then((data) => {
          setVenchels(data);
        });
        getAllVenchels(currentUser.token, setReqStatus).then(data => {
          const ae_venshels = data.filter( (venchel) => venchel.department_id === AE_ID)
          setAe_venchels(ae_venshels)
          setAeCount(ae_venshels.length)
          const pe_venshels = data.filter( (venchel) => venchel.department_id === PE_ID)
          setPe_venchels(pe_venshels)
          setPeCount(pe_venshels.length)
        }) 
      } catch (error) {}
    }
  }, [currentUser, taskFormKey]);

  const handleMenuButtonClick = (button) =>{ //!
    setSelectedButton(button)
  }

  let venchelTableComponent;  //!
  if(selectedButton === 'dep_ae') {
    console.log('Алексики')
    venchelTableComponent = <VenchelTableComponent dep={AE_ID} current_dep={ae_venchels} reRender={handleReRenderByModal}/>
  } else if(selectedButton === 'dep_pe'){
    console.log('Панфилово')
    venchelTableComponent = <VenchelTableComponent dep={PE_ID} current_dep={pe_venchels} reRender={handleReRenderByModal}/>
  }

  return (
    <div className="admin-venchel-page">
      <div className="admin-venchel-page__container">
        Редактирование оборудования {resStaus}
      </div>
      <div className="admin-venchel-page__container">
        <MainMenuAdministration />
      </div>
      <div className="admin-venchel__body">
        {/* <button onClick={openModal}>Add</button>
        {showModal && (
          <Modal isOpen={openModal} onClose={closeModal}>
            <VenchelFormV2
              keyProp={taskFormKey}
              reRender={handleReRenderByModal}
            />
          </Modal>
        )}
        <VenchelTableView data={venchels} reRender={handleReRenderByModal} />    */}
{/* ------------------------------------------------------------------ */}
        <VenchelButtonGroup
          handleButtonClick={handleMenuButtonClick}
          selectedButton={selectedButton}
          venchelAeCount={aeCount}
          venchelPeCount={peCount}
        />
        {venchelTableComponent}
      </div>
    </div>
  );
};
